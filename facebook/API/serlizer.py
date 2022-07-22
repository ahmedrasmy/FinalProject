from inspect import classify_class_attrs
from pyexpat import model
from rest_framework import routers, serializers, viewsets

from Home.models import *

class trainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields ='__all__'


class parentSerial(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields = ('first_name', 'pic','id','last_name')

class friendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields ='__all__'
    sender = parentSerial(many=False)


class friendsListSerial(serializers.ModelSerializer):
    class Meta:
        model = FrienList
        fields ='__all__'

class postsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields ='__all__'
    user = parentSerial(many=False)
class imagesserializers(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = '__all__'
    post = postsSerializer(many=False)
