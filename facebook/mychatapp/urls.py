from django.urls import path
from .views import *

urlpatterns = [
    path('friend/<str:pk>', detail, name="detail"),
    path('sent_msg/<str:pk>', sentMessages, name = "sent_msg"),
    path('rec_msg/<str:pk>', receivedMessages, name = "rec_msg"),
    path('notification', chatNotification, name = "notification"),
]
