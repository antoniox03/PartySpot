from rest_framework import serializers
from .models import Room

# Output serializer
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

#input serializer
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')

#update/patch serializer
class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators = []) #redefines code so it doesn't think it's from the model
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip','code')