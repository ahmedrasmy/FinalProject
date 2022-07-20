from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name= "index"),
    path('friend/<str:pk>', detail, name="detail"),
    path('sent_msg/<str:pk>', sentMessages, name = "sent_msg"),
    path('rec_msg/<str:pk>', receivedMessages, name = "rec_msg"),
    path('notification', chatNotification, name = "notification"),
    path('register/', register_user, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('Home/<str:pk>',home , name='Home'),
    path('profile/',profile , name='Profile'),
    path('updateprofile/',updateprofile , name='updateprofile')
]
