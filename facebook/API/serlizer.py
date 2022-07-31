from pyexpat import model
from attr import field, fields
from rest_framework import routers, serializers, viewsets

from Home.models import *


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields = '__all__'


class commentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'


class postUserSerial(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields = ('first_name', 'last_name', 'pic', 'id')


class postSerializer(serializers.ModelSerializer):
    post_photos = serializers.StringRelatedField(many=True)
    post_comments = serializers.StringRelatedField(many=True)

    class Meta:
        model = Posts
        fields = '__all__'

    user = postUserSerial(many=False)


class createPostSerializer(serializers.ModelSerializer):
    post_photos = serializers.StringRelatedField(many=True)

    class Meta:
        model = Posts
        fields = '__all__'


class createPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = '__all__'


class friend_listse(serializers.ModelSerializer):
    class Meta:
        model = FrienList
        fields = '__all__'


class friendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'

    sender = postUserSerial(many=False)


class friendsListSerial(serializers.ModelSerializer):
    class Meta:
        model = FrienList
        fields = '__all__'


class create_userSerial(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields = ()


class ChatMessagesel(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'


class Storyserializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'


class LIKE(serializers.ModelSerializer):
    class Meta:
        model = Postlike
        fields = '__all__'





class postShareSerial(serializers.ModelSerializer):
    post_photos = serializers.StringRelatedField(many=True)
    class Meta:
        model = Posts
        fields = ('postdate','user','post_photos')

    user = postUserSerial(many=False)

class ShareUserSerial(serializers.ModelSerializer):

    class Meta:
        model = Useraccount
        fields = ('first_name', 'last_name', 'pic', 'id')


class Share(serializers.ModelSerializer):
    class Meta:
        model = Shares
        fields = '__all__'
    user = ShareUserSerial(many=False)
    post = postShareSerial(many=False)

class Share2(serializers.ModelSerializer):
    class Meta:
        model = Shares
        fields = '__all__'

