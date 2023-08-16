from rest_framework import serializers
from .models import SpotifyToken

# Output serializer
class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = "__all__"
