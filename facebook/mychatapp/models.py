import profile
from xmlrpc.client import Boolean
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
GENDER_CHOICES = (
    ("m", "Male"),
    ("f", "Female"),
)


class Useraccount(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=11, blank=True)
    birthdate = models.DateField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    pic = models.ImageField(upload_to="img", blank=True, null=True)
    pic_cover = models.ImageField(upload_to="img", blank=True, null=True)
    address = models.CharField(max_length=100,null=True)
    location = models.CharField(max_length=100,null=True)

class Friends(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="useraccount_user")
    friend = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="useraccount_friend")



class ChatMessage(models.Model):
    body = models.TextField()
    msg_sender = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="msg_sender")
    msg_receiver = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="msg_receiver")
    seen = models.BooleanField(default=False)