from django.urls import path, include
from .views import *

urlpatterns = [
    path('get-auth-url', view = AuthURL.as_view()),
    path('redirect', view = spotify_callback),
    path('is-authenticated', isAuthenticated.as_view()),
    path('view', modelView.as_view()),
    path('current-song', CurrentSong.as_view()),

]
