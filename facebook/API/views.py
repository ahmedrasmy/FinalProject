from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from Home.models import *
from .serlizer import *
from django.http import JsonResponse
import json
from .utils import get_friend_request_or_false
from Home.FriendRequestStatus import FriendRequestStatus
from django.http import HttpResponse
import re
import requests
# Create your views here.


@api_view(['GET'])
def view_users(request):
    id = request.session['user_id']
    if id != 0:
        users = Useraccount.objects.filter(id=id)

    else:
        users = Useraccount.objects.all()

    if users:
        data = userSerializer(users, many=True)
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
#####################   Add New User   ################
@api_view(['POST'])
def register_user(request):
    user = userSerializer(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def update_user(request, pk):
    users = Useraccount.objects.get(id=pk)
    data = userSerializer(instance=users, data=request.data)
    print(data)
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['delete'])
def delete_user(request, pk):
    users = Useraccount.objects.get(id=pk)
    users.delete()

    return Response(status=status.HTTP_202_ACCEPTED)
@api_view(['GET'])
def getAllPosts(request):
    if request.session.has_key('user_name'):
        posts = Posts.objects.all()

        if posts:
            data = postSerializer(posts, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('login')

@api_view(['GET'])
def getProfilePosts(request):
    if request.session.has_key('user_name'):
        posts = Posts.objects.filter(user = int(request.session['user_id']))
        if posts:
            data = postSerializer(posts, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('login')

@api_view(['GET'])
def getComments(request,pk):
    post = Posts.objects.filter(id=pk)[0]
    comments = Comments.objects.filter(post = post)

    if comments:
        data = commentSerializer(comments, many=True)
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)




@api_view(['GET'])
def account_view(request, *args, **kwargs):
    context = []
    user_pk = kwargs.get("pK")
    try:
        account = Useraccount.objects.get(id=user_pk)
    except:
        return HttpResponse("Something went wrong.")
    if account:
        context.append(account.id)
        context.append( account.first_name+" "+account.last_name)
        context.append( account.email)
        context.append( str(account.pic.url))
        #context.append({'username': account.username})
        #context['hide_email'] = account.hide_email

        try:
            friend_list = FrienList.objects.get(user=account)
        except FrienList.DoesNotExist:
            friend_list = FrienList(user=account)
            friend_list.save()
        friends = friend_list.friends.all()
        context.append( list(friends))
        # Define template variables
        is_self = True
        is_friend = False
        request_sent = FriendRequestStatus.NO_REQUEST_SENT.value  # range: ENUM -> friend/friend_request_status.FriendRequestStatus
        friend_requests = None
        user_id = kwargs.get("id")
        user = Useraccount.objects.get(id=user_id)
        #user.is_authenticated and
        if user != account:
            is_self = False
            if friends.filter(id=user.id):
                is_friend = True
            else:
                is_friend = False
                if get_friend_request_or_false(sender=account, receiver=user) != False:
                    request_sent = FriendRequestStatus.THEM_SENT_TO_YOU.value
                    context.append({
                        'pending_friend_request_id':get_friend_request_or_false(sender=account, receiver=user).id
                    })
                elif get_friend_request_or_false(sender=user, receiver=account) != False:
                    request_sent = FriendRequestStatus.YOU_SENT_TO_THEM.value
                else:
                    request_sent = FriendRequestStatus.NO_REQUEST_SENT.value

        #elif not user.is_authenticated:
        #    is_self = False
        else:
            try:
                friend_requests = FriendRequest.objects.filter(receiver=user, is_active=True)
            except:
                pass
        context.append(is_self)
        context.append( is_friend)
        context.append( request_sent)
        context.append( friend_requests)
        #context['BASE_URL'] = settings.BASE_URL
        print(context)
        return JsonResponse(data=context,safe=False)


