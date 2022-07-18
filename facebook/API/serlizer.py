from rest_framework import routers, serializers, viewsets

from Home.models import *

class trainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Useraccount
        fields ='__all__'