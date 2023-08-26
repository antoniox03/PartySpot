from django.urls import path, include
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', view = index, name = ''),
    path('join', view = index),
    path('create', view = index),
    path('room/<str:roomCode>', view = index ),
    path('room/<str:roomCode>/queue', view = index ),

]
