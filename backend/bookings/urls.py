from django.urls import path
from .views import ParkingSpaceGenericsAPIView, ParkingSpaceAPIView

urlpatterns = [
    path('booking-history/booking/<str:email>/', ParkingSpaceGenericsAPIView.as_view(), name='booking-history-list'),
    path('booking-history/create/', ParkingSpaceGenericsAPIView.as_view()),
    path('booking-history/delete/<int:pk>', ParkingSpaceGenericsAPIView.as_view()),
    path('parking/list/', ParkingSpaceAPIView.as_view())
    # ... other URL patterns ...
]
