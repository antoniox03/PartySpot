from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', view= RoomView.as_view()),
    path('create-room', view= CreateRoomView.as_view()),
    path('view', view= RoomSearchView.as_view()),
    path('get-room', view = GetRoom.as_view()),
    path('join-room', view = JoinRoom.as_view()),
     path('user-in-room', view = UserInRoom.as_view()),

]

