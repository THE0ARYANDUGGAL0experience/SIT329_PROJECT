from rest_framework import generics, mixins
from .serializers import ParkingHistorySerializer, ParkingSpaceSerializer
from .models import ParkingHistory, ParkingSpace
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
 
User = get_user_model()

# Create your views here.
class ParkingSpaceGenericsAPIView(mixins.CreateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    serializer_class = ParkingHistorySerializer
    queryset = ParkingHistory.objects.all()
    lookup_field = 'pk'
    
    def get(self, request, *args, **kwargs):
        
        email = self.kwargs.get('email')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found with the given name."}, status=status.HTTP_400_BAD_REQUEST)
        
        bookings = ParkingHistory.objects.filter(user=user)

        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        parkingSpace = instance.parking
        parkingSpace.current_state = "Free"
        parkingSpace.save()        

        return self.destroy(request, *args, **kwargs)
    
class ParkingSpaceAPIView(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = ParkingSpaceSerializer
    queryset = ParkingSpace.objects.all()


    def get(self, request, *args, **kwargs):
        return self.list(request,*args,**kwargs)