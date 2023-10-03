from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime

User = get_user_model()

bookingsChoices = (
    ("Booked", "Booked"),
    ("Free", "Free"),
    ("Occupied", "Occupied"),
)

# Create your models here.
class ParkingSpace(models.Model):
    unique_id = models.CharField(max_length=255, unique=True, blank=False)
    current_state = models.CharField(max_length=255, choices=bookingsChoices, default='Free')
    is_Occupied = models.BooleanField(default=False)

class ParkingHistory(models.Model):
    parking = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    when = models.DateTimeField(auto_now=True)
    book_from = models.DateTimeField(blank=False)
    end_from = models.DateTimeField(blank=False)
    state = models.CharField(max_length=255, choices=bookingsChoices)
    is_booking_complete = models.BooleanField(default=False)

    @property
    def is_booking_expired(self):
        return datetime.now() > self.end_from
    
@receiver(post_save, sender=ParkingHistory)
def update_booking_completion(sender, instance, created, **kwargs):
    if not created and instance.is_booking_expired and not instance.is_booking_complete:
        instance.parking.current_state = "Free"
        instance.parking.save()
        instance.is_booking_complete = True
        instance.save()