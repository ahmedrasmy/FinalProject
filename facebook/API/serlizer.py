from pyexpat import model
from rest_framework import routers, serializers, viewsets

from Home.models import *

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields ='__all__'

class friend_listse(serializers.ModelSerializer):
    class Meta:
        model = FrienList
        fields='__all__'

class commentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields ='__all__'

class postUserSerial(serializers.ModelSerializer):

    class Meta:

        model = Useraccount

        fields = ('first_name', 'last_name', 'pic','id')


class postSerializer(serializers.ModelSerializer):
    post_photos = serializers.StringRelatedField(many=True)
    post_comments = serializers.StringRelatedField(many=True)
    class Meta:
        model = Posts

        fields = '__all__'

    user = postUserSerial(many=False)


# class imagesserializers(serializers.ModelSerializer):
#
#     class Meta:
#
#         model = Photos
#
#         fields = '__all__'
#
#     post = postSerializer(many=False)


class friendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields ='__all__'
    sender = postUserSerial(many=False)


class friendsListSerial(serializers.ModelSerializer):
    class Meta:
        model = FrienList
        fields ='__all__'