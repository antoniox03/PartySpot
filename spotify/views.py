from django.shortcuts import render
from .credentials import REDIREICT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from rest_framework import generics
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated, execute_spotify_api_request

from django.shortcuts import redirect, render
from .models import SpotifyToken
from .serializers import TokenSerializer
from api.models import Room 



# Create your views here.
class AuthURL(APIView):
    def get(self, request, format = None):
        scropes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing' #this comes from Spotify API Documentation

        url = Request('Get', 'https://accounts.spotify.com/authorize', params= {
            'scope': scropes, 
            'response_type': 'code',
            'redirect_uri' : REDIREICT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status =status.HTTP_200_OK )
    
def spotify_callback(request, format = None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data = {
        'grant_type' : 'authorization_code',
        'code' : code, # Once we are authorized on spotify, they send us a code to get another code
        'redirect_uri' : REDIREICT_URI,
        'client_id': CLIENT_ID,
        'client_secret' : CLIENT_SECRET
    }).json()
    access_token = response.get('access_token')  #We get an access token 
    token_type = response.get('token_type') # 
    refresh_token = response.get('refresh_token') # A refresh token
    expires_in = response.get('expires_in') # When it expires
    error = response.get('error')

    # We get all these tokens once we are authorized on spotify 

    if not request.session.exists(request.session.session_key):
        request.session.create()


    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token) #Update sessionid with the new tokens and redirect to front end 
    return redirect('frontend:')


class isAuthenticated(APIView):
    def get(self, request, format = None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)

class modelView(generics.ListAPIView):
    queryset = SpotifyToken.objects.all()
    serializer_class = TokenSerializer

class CurrentSong(APIView):
    def get(self, request, format = None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:   
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host
        endpoint = "player/currently-playing"
        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'item' not in response:
            return Response({"message":"Nothing is Playing"}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        # create string of artist seperated by commas
        artist_string = ""
        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name

        song = {
            'title': item.get('name'),
            'artist' : artist_string, 
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'votes': 0,
            'id': song_id
        }

        return Response(song, status=status.HTTP_200_OK)
