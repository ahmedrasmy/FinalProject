from rest_framework import routers, serializers, viewsets

from Home.models import *

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields ='__all__'



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