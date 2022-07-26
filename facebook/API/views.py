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

from django.db.models import Q

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


@api_view(['GET'])
def get_Likee(request):
    users = Postlike.objects.all()
    data = LIKE(users, many=True)

    return Response(data.data)


#####################   Add New User   ################
@api_view(['delete'])
def delete_like(request, pk):
    trainee = Postlike.objects.get(pk=pk)
    trainee.delete()

    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['Post'])
def get_Like(request):
    user = LIKE(data=request.data)

    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_user(request):
    user = userSerializer(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

#####################   Add New Post   ################
@api_view(['POST'])
def addpost(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        # print(request.data)
        # post = createPostSerializer(data=request.data)
        # if post.is_valid():
        #     post.save()
        #     return Response(post.data, status=status.HTTP_201_CREATED)
        # return Response(post.errors, status=status.HTTP_400_BAD_REQUEST)

<<<<<<< HEAD
=======
        print(request.data['postcontent'],request.data.getlist('imagecontent'))
        newPost = Posts.objects.create(
            user=user, postcontent=request.data['postcontent']
        )
        if newPost:
            photo = Photos.objects.create(
                post=newPost,
                imagecontent=request.data['imagecontent']
            )
            photo.save()
        return Response('successsfully')
    else:
        return redirect('/auth/login/')

#####################   Add New Comment   ################
@api_view(['POST'])
def addcomment(request):
    if request.session.has_key('user_name'):
        comment = commentSerializer(data=request.data)
        if comment.is_valid():
            comment.save()
            return Response(comment.data, status=status.HTTP_201_CREATED)
        return Response(comment.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return redirect('/auth/login/')
>>>>>>> 2e13bbe725c8311b41cae46c01961bd85da5a788
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
def getComments(request, pk):
    post = Posts.objects.filter(id=pk)[0]
    comments = Comments.objects.filter(post=post)

    if comments:
        data = commentSerializer(comments, many=True)
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_one_user(request, id):
    if request.session.has_key('user_name'):
        context = []
        user_pk = id
        try:
            account = Useraccount.objects.get(id=user_pk)
        except:
            return HttpResponse("Something went wrong.")
        if account:
            # context.append({'username': account.username})
            # context['hide_email'] = account.hide_email
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
            # user.is_authenticated and
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

            # elif not user.is_authenticated:
            #    is_self = False
            else:
                try:
                    friend_requests = FriendRequest.objects.filter(
                        reciver=user, is_active=True).count()
                except:
                    pass

<<<<<<< HEAD
            # friend_requests = serializers.serialize("json", friend_requests)
            # friend_requests = friend_requests.values()
            context.append({
                'id': account.id,
                'friends': friends.count(),
                'email': account.email,
                'pic': str(account.pic.url),
                'pic_cover': str(account.pic_cover.url),
                'is_self': is_self,
                'is_friend': is_friend,
                'user_name': account.first_name + " " + account.last_name,
                'request_sent': request_sent,
                'friend_requests': friend_requests,
                'pending_friend_request_id': pending_friend_request_id,
                'Bio': account.Bio,
            })
=======
            #friend_requests = serializers.serialize("json", friend_requests)
            #friend_requests = friend_requests.values()
            if account.pic and account.pic_cover :
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
            else:
                context.append({
                    'id': account.id,
                    'friends': friends.count(),
                    'email': account.email,
                    'pic': "",
                    'pic_cover': "",
                    'is_self': is_self,
                    'is_friend': is_friend,
                    'user_name': account.first_name + " " + account.last_name,
                    'request_sent': request_sent,
                    'friend_requests': friend_requests,
                    'pending_friend_request_id': pending_friend_request_id,
                    'Bio': account.Bio,
                })
>>>>>>> 2e13bbe725c8311b41cae46c01961bd85da5a788
            print(friend_requests)
            # context.append({'friend_requests': list(friend_requests)})
            # context['BASE_URL'] = settings.BASE_URL
            return JsonResponse(data=context, safe=False)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def get_one_user_Posts(request, id):
    if request.session.has_key('user_name'):
        posts = reversed(Posts.objects.filter(user=int(id)).reverse())
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
def friends_list(request, id):
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

<<<<<<< HEAD

@api_view(['GET'])
def get_all_users(request,name):
    if request.session.has_key('user_name'):

        context = []
        user_pk = id
        myuser = Useraccount.objects.get(id=int(request.session['user_id']))
        # users = Useraccount.objects.all()
        users = Useraccount.objects.filter(
            Q(first_name__icontains=name) | Q(last_name__icontains=name))
        if myuser:
            try:
                friend_list = FrienList.objects.get(user=myuser)
            except FrienList.DoesNotExist:
                friend_list = FrienList(user=myuser)
                friend_list.save()
        friends = friend_list.friends.all()
        for user in users:
            is_self = True
            is_friend = False
            pending_friend_request_id = ''
            request_sent = FriendRequestStatus.NO_REQUEST_SENT.value
            friend_requests = 0
            if user != myuser:
                is_self = False
                if friends.filter(id=user.id):
                    is_friend = True
                else:
                    is_friend = False
                    if get_friend_request_or_false(sender=user, receiver=myuser) != False:
                        request_sent = FriendRequestStatus.THEM_SENT_TO_YOU.value
                        pending_friend_request_id = get_friend_request_or_false(
                            sender=user, receiver=myuser).id
                    elif get_friend_request_or_false(sender=myuser, receiver=user) != False:
                        request_sent = FriendRequestStatus.YOU_SENT_TO_THEM.value
                    else:
                        request_sent = FriendRequestStatus.NO_REQUEST_SENT.value
            else:
                try:
                    friend_requests = FriendRequest.objects.filter(
                        reciver=myuser, is_active=True).count()
                except:
                    pass
            if user.pic:
                context.append({
                    'id': user.id,
                    'friends': friends.count(),
                    'email': user.email,
                    'pic': str(user.pic.url),
                    'is_self': is_self,
                    'is_friend': is_friend,
                    'user_name': user.first_name + " " + user.last_name,
                    'request_sent': request_sent,
                    'friend_requests': friend_requests,
                    'pending_friend_request_id': pending_friend_request_id,
                    'Bio': user.Bio,
                })
            else:
                context.append({
                    'id': user.id,
                    'friends': friends.count(),
                    'email': user.email,
                    'is_self': is_self,
                    'is_friend': is_friend,
                    'user_name': user.first_name + " " + user.last_name,
                    'request_sent': request_sent,
                    'friend_requests': friend_requests,
                    'pending_friend_request_id': pending_friend_request_id,
                    'Bio': user.Bio,
                })
        return JsonResponse(data=context, safe=False)
    else:
=======
@api_view(['GET'])

def friends_list_contacts(request):

    if request.session.has_key('user_name'):

        user_id = int(request.session['user_id'])

        user = Useraccount.objects.get(id=user_id)

        friend_list = FrienList.objects.filter(user=user)

        data = postUserSerial(friend_list[0].friends.all(), many=True)

        return Response(data.data)

    else:

>>>>>>> 2e13bbe725c8311b41cae46c01961bd85da5a788
        return redirect('/auth/login/')
