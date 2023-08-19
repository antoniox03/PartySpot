from django.db import models
from api.models import Room 

# Create your models here.
class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length = 50)

#Voting is for current song, we have to clear votes for each vote

class Vote(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50) # What song they voted for
    room = models.ForeignKey(Room, on_delete=models.CASCADE) #pass instance of another object, stores reference to model, # if room gets deleted, delete this object