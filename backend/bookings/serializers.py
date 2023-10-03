from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import ParkingHistory, ParkingSpace
from django.contrib.auth import get_user_model

User = get_user_model()

class ParkingSpaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParkingSpace
        fields = ['id','unique_id', 'is_Occupied', 'current_state']

class ParkingHistorySerializer(serializers.ModelSerializer):    
    parking_space = ParkingSpaceSerializer(read_only=True,source='parking')

    class Meta:
        model = ParkingHistory
        fields = ['id','user', 'parking','parking_space', 'when', 'state', 'book_from', 'end_from', 'is_booking_complete']

    def create(self, validated_data):                
        parkingSpace = validated_data['parking']                        

        if not parkingSpace.is_Occupied and parkingSpace.current_state == "Free":                        
            parkingSpace.current_state = "Booked"
            parkingSpace.save()
            instance = ParkingHistory.objects.create(
                **validated_data
            )
            return instance
        else:        
            raise serializers.ValidationError({"parking":"Parking Space not Available"})
          