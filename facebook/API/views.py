from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from Home.models import *
from .serlizer import *
import requests
# Create your views here.


@api_view(['GET'])
def view_trainees(request,id=0):

    if id != 0:
        users = Useraccount.objects.filter(id=id)

    else:
        users = Useraccount.objects.all()

    if users:
        data = trainSerializer(users, many=True)
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_trainees(request):
    users = trainSerializer(data=request.data)
    if users.is_valid():
        users.save()
        return Response(users.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update(request, pk):
    users = Useraccount.objects.get(pk=pk)
    data = trainSerializer(instance=users, data=request.data)
    print(data)
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['delete'])
def delete(request, pk):
    users = Useraccount.objects.get(pk=pk)
    users.delete()

    return Response(status=status.HTTP_202_ACCEPTED)

