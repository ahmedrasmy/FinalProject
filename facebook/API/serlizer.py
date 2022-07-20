from rest_framework import routers, serializers, viewsets

from Home.models import *

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields ='__all__'


class postSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields ='__all__'

class commentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields ='__all__'