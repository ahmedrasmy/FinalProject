from audioop import reverse
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

@api_view(['GET'])
def get_all(request):
    users = Useraccount.objects.all()
    data = userSerializer(users, many=True)
    return Response(data.data)
        

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
        posts = reversed(Posts.objects.all())
        if posts:
            data = postSerializer(posts, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')

@api_view(['GET'])
def getProfilePosts(request):
    if request.session.has_key('user_name'):
        posts = reversed(Posts.objects.filter(
            user=int(request.session['user_id'])))
        if posts:
            data = postSerializer(posts, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')


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
def get_one_user(request,id):
    if request.session.has_key('user_name'):
        context=[]
        user_pk = id
        try:
            account = Useraccount.objects.get(id=user_pk)
        except:
            return HttpResponse("Something went wrong.")
        if account:
            #context.append({'username': account.username})
            #context['hide_email'] = account.hide_email
            try:
                friend_list = FrienList.objects.get(user=account)
            except FrienList.DoesNotExist:
                friend_list = FrienList(user=account)
                friend_list.save()
            friends = friend_list.friends.all()
            # Define template variables
            is_self = True
            is_friend = False
            pending_friend_request_id = ''
            request_sent = FriendRequestStatus.NO_REQUEST_SENT.value  # range: ENUM -> friend/friend_request_status.FriendRequestStatus
            friend_requests = 0
            user_id = int(request.session['user_id'])
            print(user_id)
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
                        pending_friend_request_id = get_friend_request_or_false(
                            sender=account, receiver=user).id
                    elif get_friend_request_or_false(sender=user, receiver=account) != False:
                        request_sent = FriendRequestStatus.YOU_SENT_TO_THEM.value
                    else:
                        request_sent = FriendRequestStatus.NO_REQUEST_SENT.value

            #elif not user.is_authenticated:
            #    is_self = False
            else:
                try:
                    friend_requests =FriendRequest.objects.filter(
                        reciver=user, is_active=True).count()
                except:
                    pass

            #friend_requests = serializers.serialize("json", friend_requests)
            #friend_requests = friend_requests.values()
            context.append({
                'id': account.id,
                'friends': friends.count(),
                'email': account.email,
                'pic': str(account.pic.url),
                'pic_cover': str(account.pic_cover.url),
                'is_self': is_self,
                'is_friend': is_friend,
                'user_name': account.first_name+" "+account.last_name,
                'request_sent': request_sent,
                'friend_requests': friend_requests,
                'pending_friend_request_id': pending_friend_request_id,
                'Bio':account.Bio,
            })
            print(friend_requests)
            #context.append({'friend_requests': list(friend_requests)})
            #context['BASE_URL'] = settings.BASE_URL
            return JsonResponse(data=context,safe=False)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def get_one_user_Posts(request, id):
    if request.session.has_key('user_name'):
        posts = reversed (Posts.objects.filter(user=int(id)).reverse())
        if posts:
            data = postSerializer(posts, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')



@api_view(['GET'])
def friend_requests(request):
        if request.session.has_key('user_name'):
            user_id = int(request.session['user_id'])
            user = Useraccount.objects.get(id=user_id)
            friend_requests = FriendRequest.objects.filter(
                reciver=user, is_active=True)
            data = friendRequestSerializer(friend_requests, many=True)
            return Response(data.data)
        else:
            return redirect('/auth/login/')

@api_view(['GET'])
def friends_list(request,id):
    if request.session.has_key('user_name'):
        data = {}
        # user_id = int(request.session['user_id'])
        user = Useraccount.objects.get(id=id)
        # auth_user_friend_list = FrienList.objects.get(user=user)
        friend_list = FrienList.objects.filter(user=user)
        data = postUserSerial(friend_list[0].friends.all(), many=True)
        # for friend in friend_list:
        #     for fr in friend.friends.all():
        #         print(fr.id)
        #         print (auth_user_friend_list.is_mutual_friend(fr))
        #         data |= postUserSerial(fr, many=True)
        return Response(data.data)
    else:
        return redirect('/auth/login/')
