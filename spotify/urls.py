from django.urls import path, include
from .views import *

urlpatterns = [
    path('get-auth-url', view = AuthURL.as_view()),
    path('redirect', view = spotify_callback),
    path('is-authenticated', isAuthenticated.as_view()),
    path('view', modelView.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('pause', PauseSong.as_view()),
    path('play', PlaySong.as_view()),
    path('skip', SkipSong.as_view()),
    path('delete-vote', deleteVote.as_view()),
    path('queue', Queue.as_view()),


]
