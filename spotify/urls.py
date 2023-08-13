from django.urls import path, include
from .views import AuthURL, spotify_callback, isAuthenticated

urlpatterns = [
    path('get-auth-url', view = AuthURL.as_view()),
    path('redirect', view = spotify_callback),
    path('is-authenticated', isAuthenticated.as_view()),

]
