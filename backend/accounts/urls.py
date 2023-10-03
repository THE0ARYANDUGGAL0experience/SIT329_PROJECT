# urls.py

from django.urls import path
from .views import UserRegistrationView, UserDetailsView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'), 
    path('user/', UserDetailsView.as_view()), 
    path('login/', obtain_auth_token),  

]
