import json
from audioop import reverse
from lib2to3.pgen2.token import NOTEQUAL
from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from Home.models import *
from .serlizer import *
from django.http import JsonResponse
from .utils import get_friend_request_or_false
from Home.FriendRequestStatus import FriendRequestStatus
from django.http import HttpResponse
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
    if request.session.has_key('user_name'):
        users = Useraccount.objects.all()
        data = userSerializer(users, many=True)
        return Response(data.data)
    else:
        return redirect('/auth/login/')
        
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
        # return Response(user.data, status=status.HTTP_201_CREATED)
        users = Postlike.objects.all()
        data = LIKE(users, many=True)
        return Response(data.data)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['Post'])
def add_share(request):
    user = Share2(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_share(request):
    if request.session.has_key('user_name'):

        friendlist=FrienList.objects.filter(
            user=int(request.session['user_id']))
        arr = []
        if friendlist :

            friends= friendlist[0].friends.all()


            for friend in friends:
                posts = reversed(Shares.objects.filter(
                    user=friend))
                for post in posts:
                    arr2 = []
                    photos = Photos.objects.filter(post=post.post)
                    for photo in photos:
                        arr2.append( str(photo))

                    arr.append({
                        'post_id_share':post.id,
                        'post_time_share': post.sharedate,
                        'username_share':post.user.first_name+' '+post.user.last_name,
                        'user_pic_share':str(post.user.pic.url),
                        'user_id_share':post.user.id,
                        'post_username':post.post.user.first_name+' '+post.post.user.last_name,
                        'user_org_pic':str(post.post.user.pic.url),
                        'post_org_id':post.post.id,
                        'body_org':post.post.postcontent,
                        'pic':arr2,
                        'post_org_time':post.post.postdate
                    })


        postss = reversed(Shares.objects.filter(
            user=int(request.session['user_id'])))
        for post in postss:
            arr2 = []
            photos = Photos.objects.filter(post=post.post)
            for photo in photos:
                arr2.append(str(photo))

            arr.append({
                'post_id_share': post.id,
                'post_time_share': post.sharedate,
                'username_share': post.user.first_name + ' ' + post.user.last_name,
                'user_pic_share': str(post.user.pic.url),
                'user_id_share': post.user.id,
                'post_username': post.post.user.first_name + ' ' + post.post.user.last_name,
                'user_org_pic': str(post.post.user.pic.url),
                'post_org_id': post.post.id,
                'body_org': post.post.postcontent,
                'pic': arr2,
                'post_org_time': post.post.postdate
            })

        return JsonResponse(arr, safe=False)

    else:
        return redirect('/auth/login/')






@api_view(['POST'])
def register_user(request):
        user = userSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def addpost(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(
            id=int(request.session['user_id']))[0]

        newPost = Posts.objects.create(
            user=user, postcontent=request.data['postcontent'])
        if newPost:
            friend_list = FrienList.objects.filter(user=user.id)
            friends = friend_list[0].friends.all()
            for friend in friends:
                user_receiver = Useraccount.objects.filter(id=friend.id)[0]
                notify = Notification.objects.create(
                    user=user , body=" Add A new post ",
                    user_receiver= user_receiver ,post=newPost,
                )
                notify.save()
            photo = Photos.objects.create(
                post=newPost, imagecontent=request.data['imagecontent'])
            photo.save()
            return Response('successsfully')

@api_view(['POST'])
def updateprofile(request):
    user = Useraccount.objects.get(id=int(request.session['user_id']))
    if request.data['pic'] :
        user.pic = request.data['pic']
        user.save()
        newPost = Posts.objects.create(
            user=user, postcontent="update his profile picture"
        )
        photo = Photos.objects.create(
            post=newPost,
            imagecontent=user.pic
        )
        photo.save()
        friend_list = FrienList.objects.filter(user=user.id)
        friends = friend_list[0].friends.all()
        for friend in friends:
            user_receiver = Useraccount.objects.filter(id=friend.id)[0]
            notify = Notification.objects.create(
                user=user, body=" Update His Profile Picture ",
                user_receiver=user_receiver ,post=newPost
            )
            notify.save()

    if request.data['pic_cover'] :
        user.pic_cover = request.data['pic_cover']
        user.save()
        newPost = Posts.objects.create(
            user=user, postcontent="update his cover picture" ,post=newPost
        )
        photo = Photos.objects.create(
            post=newPost,
            imagecontent=user.pic_cover
        )
        photo.save()
        friend_list = FrienList.objects.filter(user=user.id)
        friends = friend_list[0].friends.all()
        for friend in friends:
            user_receiver = Useraccount.objects.filter(id=friend.id)[0]
            notify = Notification.objects.create(
                user=user, body=" Update His Cover Picture ",
                user_receiver=user_receiver
            )
            notify.save()
    return redirect('/home/pro/'+str(request.session['user_id']))

@api_view(['GET'])
def postNotification(request):
    if request.session.has_key('user_name'):
        user_receiver = Useraccount.objects.filter(
            id=int(request.session['user_id']))[0]
        notifications = reversed(Notification.objects.filter(user_receiver=user_receiver , seen=False))
        if notifications:
            data = notifySerializer(notifications, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')

@api_view(['GET'])
def unseenNotification(request,pk,id):
    if request.session.has_key('user_name'):
        notify = Notification.objects.get(id=pk)
        if notify:
            notify.delete()
            return redirect('/home/Post/'+id)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')

        
@api_view(['GET'])
def get_one_post(request,id):
    if request.session.has_key('user_name'):
        post = Posts.objects.filter(id=id)
        if post:
            data = postSerializer(post , many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')

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

@api_view(['PUT'])
def update_user(request, pk):
    if request.session.has_key('user_name'):
        users = Useraccount.objects.get(id=pk)
        data = userSerializer(instance=users, data=request.data)
        print(data)
        if data.is_valid():
            data.save()
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')


@api_view(['delete'])
def delete_user(request, pk):
    if request.session.has_key('user_name'):
        users = Useraccount.objects.get(id=pk)
        users.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    else:
        return redirect('/auth/login/')

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
    if request.session.has_key('user_name'):
        post = Posts.objects.filter(id=pk)[0]
        comments = Comments.objects.filter(post = post)


        if comments:
            data = commentSerializer(comments, many=True)
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return redirect('/auth/login/')

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
            try:
                friend_list = FrienList.objects.get(user=account)
            except FrienList.DoesNotExist:
                friend_list = FrienList(user=account)
                friend_list.save()
            friends = friend_list.friends.all()
            is_self = True
            is_friend = False
            pending_friend_request_id = ''
            request_sent = FriendRequestStatus.NO_REQUEST_SENT.value  # range: ENUM -> friend/friend_request_status.FriendRequestStatus
            friend_requests = 0
            user_id = int(request.session['user_id'])
            user = Useraccount.objects.get(id=user_id)
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
            else:
                try:
                    friend_requests = FriendRequest.objects.filter(
                        reciver=user, is_active=True).count()
                except:
                    pass
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
                    'friend_requests': friend_requests,
                    'request_sent': request_sent,
                    'pending_friend_request_id': pending_friend_request_id,
                    'Bio': account.Bio,
                })
            print(friend_requests)
            return JsonResponse(data=context, safe=False)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def get_one_user_Posts(request, id):
    if request.session.has_key('user_name'):
        posts = reversed(Posts.objects.filter(user=int(id)))
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
        user = Useraccount.objects.get(id=id)
        friend_list = FrienList.objects.filter(user=user)
        data = postUserSerial(friend_list[0].friends.all(), many=True)
        return Response(data.data)
    else:
        return redirect('/auth/login/')

@api_view(['GET'])
def friends_list_chat(request):
    if request.session.has_key('user_name'):
        user_id = int(request.session['user_id'])
        user = Useraccount.objects.get(id=user_id)
        friend_list = FrienList.objects.filter(user=user)
        data = postUserSerial(friend_list[0].friends.all(), many=True)
        return Response(data.data)
    else:
        return redirect('/auth/login/')


################ chat views ##################
@api_view(['GET'])
def chatIndex(request):
    if request.session.has_key('user_name'):
        user_id = int(request.session['user_id'])
        user = Useraccount.objects.get(id=user_id)
        friend_list = FrienList.objects.filter(user=user)
        data = postUserSerial(friend_list[0].friends.all(), many=True)
        return Response(data.data)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def chatNotification(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(
            id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friends = friend_list[0].friends.all()
        arr = []
        for friend in friends:
            chats = ChatMessage.objects.filter(msg_sender__id=friend.user.id, msg_receiver=user, seen=False)
            if chats.count() > 0 :
                arr.append(chats.count())
            else : 
                arr.append(0)
        return JsonResponse(arr, safe=False)
    else:
        return redirect('/auth/login/')



@api_view(['GET','POST'])
def detail(request, pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(
            id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friend = friend_list[0].friends.get(id=pk)
        chats = ChatMessage.objects.all()
        rec_chats = ChatMessage.objects.filter(
            msg_sender=friend, msg_receiver=user, seen=False)
        rec_chats.update(seen=True)
        data = ChatMessagesel(chats, many=True) 
        return Response(data.data)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def detail_counter(request, pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.get(
            id=int(request.session['user_id']))
        friend = Useraccount.objects.get(id=pk)
        chats = ChatMessage.objects.filter(
            msg_sender=friend, msg_receiver=user)
        return JsonResponse(chats.count(), safe=False)
    else:
        return redirect('/auth/login/')


@api_view(['POST'])
def sentMessages(request, pk):
    if request.session.has_key('user_name'):
        data = ChatMessagesel(data=request.data)
        if data.is_valid():
            data.save()
            return Response(data.data)
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return redirect('/auth/login/')

@api_view(['GET'])
def receivedMessages(request, pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(
            id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friend = friend_list[0].friends.get(id=pk)
        arr = []
        chats = ChatMessage.objects.filter(
            msg_sender=friend, msg_receiver=user)
        for chat in chats:
            arr.append(chat.body)
        chats.update(seen=True)
        return JsonResponse(arr, safe=False)
    else:
        return redirect('/auth/login/')


@api_view(['POST'])
def addStory(request):
    if request.session.has_key('user_name'):
        data = Storyserializer(data=request.data)
        if data.is_valid():
            data.save()
            return Response(data.data)
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return redirect('/auth/login/')

@api_view(['GET'])
def story(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.get(id=int(request.session['user_id']))
        mystorys = Story.objects.filter(user=user)
        arr = []
        for st in mystorys:
            arr.append({
                "story_id": st.id,
                "story_pic": str(st.pic.url),
                "story_body": st.body,
                "user_pic": str(st.user.pic.url),
                "user_name": st.user.first_name+" "+st.user.last_name,
                "user_id": st.user.id,
                "is_mine":True,
            })
        try:
            friend_list = FrienList.objects.get(user=user)
        except FrienList.DoesNotExist:
            friend_list = FrienList(user=user)
            friend_list.save()
        try:
            friends = friend_list[0].friends.all()
            for friend in friends:
                storys = Story.objects.filter(user=friend)
                for story in storys:
                    if story.pic:
                        arr.append({
                            "story_id": story.id,
                            "story_pic": str(story.pic.url),
                            "story_body": story.body,
                            "user_pic": str(story.user.pic.url),
                            "user_name": story.user.first_name+" "+story.user.last_name,
                            "user_id": story.user.id,
                            "is_mine": False,
                        })
                    else:
                        arr.append({
                            "story_id": story.id,
                            "story_body": story.body,
                            "user_pic": str(story.user.pic.url),
                            "user_name": story.user.first_name+" "+story.user.last_name,
                            "user_id": story.user.id,
                            "is_mine": False,
                        })
        except:
            pass
        return JsonResponse(arr, safe=False)
    else:
        return redirect('/auth/login/')

@api_view(['DELETE'])
def deleteStory(request,pk):
    if request.session.has_key('user_name'):
        story = Story.objects.get(pk=pk)
        story.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    else:
        return redirect('/auth/login/')


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
            if user.pic :
                context.append({
                    'id': user.id,
                    'friends': friends.count(),
                    'email': user.email,
                    'pic': str(user.pic.url),
                    'is_self': is_self,
                    'is_friend': is_friend,
                    'user_name': user.first_name+" "+user.last_name,
                    'request_sent': request_sent,
                    'friend_requests': friend_requests,
                    'pending_friend_request_id': pending_friend_request_id,
                    'Bio': user.Bio,
                })
            else :
                context.append({
                    'id': user.id,
                    'friends': friends.count(),
                    'email': user.email,
                    'is_self': is_self,
                    'is_friend': is_friend,
                    'user_name': user.first_name+" "+user.last_name,
                    'request_sent': request_sent,
                    'friend_requests': friend_requests,
                    'pending_friend_request_id': pending_friend_request_id,
                    'Bio': user.Bio,
                })
        return JsonResponse(data=context, safe=False)
    else:
        return redirect('/auth/login/')

@api_view(['GET'])
def friends_list_contacts(request):
    if request.session.has_key('user_name'):
        user_id = int(request.session['user_id'])
        user = Useraccount.objects.get(id=user_id)
        friend_list = FrienList.objects.filter(user=user)
        data = postUserSerial(friend_list[0].friends.all(), many=True)
        return Response(data.data)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def sugistions_list(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.get(id=request.session['user_id'])
        arr=[]
        try:
            friend_list = FrienList.objects.filter(user=user)
            print("iam heree")
            friends = friend_list[0].friends.all()
            users = Useraccount.objects.filter(~Q(id=user.id))
            for use in users:
                if friends.filter(id=use.id).exists():
                    pass 
                else :
                    pending_friend_request_id = ''
                    request_sent = FriendRequestStatus.NO_REQUEST_SENT.value
                    if get_friend_request_or_false(sender=use, receiver=user) != False:
                        request_sent = FriendRequestStatus.THEM_SENT_TO_YOU.value
                        pending_friend_request_id = get_friend_request_or_false(
                            sender=use, receiver=user).id
                    elif get_friend_request_or_false(sender=user, receiver=use) != False:
                        request_sent = FriendRequestStatus.YOU_SENT_TO_THEM.value
                    else:
                        request_sent = FriendRequestStatus.NO_REQUEST_SENT.value
                    arr.append(
                        {
                            'user_name': use.first_name+" "+use.last_name,
                            'user_id': use.id,
                            'user_pic': str(use.pic.url),
                            'user_email': use.email,
                            'request_sent': request_sent,
                            'pending_friend_request_id': pending_friend_request_id,
                        }
                    )
        except FrienList.DoesNotExist:
            friend_list = FrienList(user=user)
            friend_list.save()
            friends = Useraccount.objects.filter(~Q(id=user.id))
            for friend in friends:
                pending_friend_request_id = ''
                request_sent = FriendRequestStatus.NO_REQUEST_SENT.value
                if get_friend_request_or_false(sender=friend, receiver=user) != False:
                    request_sent = FriendRequestStatus.THEM_SENT_TO_YOU.value
                    pending_friend_request_id = get_friend_request_or_false(
                        sender=friend, receiver=user).id
                elif get_friend_request_or_false(sender=user, receiver=friend) != False:
                    request_sent = FriendRequestStatus.YOU_SENT_TO_THEM.value
                else:
                    request_sent = FriendRequestStatus.NO_REQUEST_SENT.value
                arr.append(
                    {
                        'user_name': friend.first_name+" "+friend.last_name,
                        'user_id': friend.id,
                        'user_pic': str(friend.pic.url),
                        'user_email': friend.email,
                        'request_sent': request_sent,
                        'pending_friend_request_id': pending_friend_request_id,
                    }
                )
        return JsonResponse(arr, safe=False)
    else:
        return redirect('/auth/login/')


################# for group #############
@api_view(['GET'])
def get_group(request,id):
    if request.session.has_key('user_name'):
        group = Groups.objects.filter(id=id)
        data = GetGroupSerializer(group, many=True)
        print(data)
        return Response(data.data)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def get_user_for_group(request,id):
    if request.session.has_key('user_name'):
        user_id = int(request.session['user_id'])
        user = Useraccount.objects.get(id=user_id)
        group = Groups.objects.filter(id=id)
        print(group[0].owner)
        members = group[0].members.all()
        arr=[]
        is_member = False
        is_owner = False
        if members.filter( id=user.id ):
            is_member = True
        else:
            is_member = False
        if user == group[0].owner:
            is_owner = True
        else :
            is_owner = False
        arr.append({
            "user_id":user.id,
            "user_name":user.first_name+" "+user.last_name,
            "user_pic":str(user.pic.url),
            "is_member": is_member,
            "is_owner": is_owner,
        })
        return JsonResponse(arr, safe=False)
    else:
        return redirect('/auth/login/')


@api_view(['POST'])
def addpostforgroups(request):
    if request.session.has_key('user_name'):
        user_id = int(request.session['user_id'])
        user = Useraccount.objects.get(id=user_id)
        data = PostsGroupsSerializer(data=request.data)
        if data.is_valid():
            data.save()
            return Response(data.data)
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def getpostforgroup(request,id):
    if request.session.has_key('user_name'):
        posts= reversed(PostsGroups.objects.filter(group=id))
        data = PostsGroupsSerializerget(posts, many=True)
        return Response(data.data)
    else:
        return redirect('/auth/login/')


@api_view(['GET'])
def get_likee_group(request):
    likes = Postlikegroup.objects.all()
    data = LIKEGroup(likes, many=True)
    return Response(data.data)


@api_view(['delete'])
def delete_like_group(request, pk):
    like = Postlikegroup.objects.get(pk=pk)
    like.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['Post'])
def get_like_group(request):
    like = LIKEGroup(data=request.data)
    if like.is_valid():
        like.save()
        likes = Postlikegroup.objects.all()
        data = LIKEGroup(likes, many=True)
        return Response(data.data)
    return Response(like.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def addcommentGroup(request):
    if request.session.has_key('user_name'):
        comment = commentSerializergroup(data=request.data)
        if comment.is_valid():
            comment.save()
            return Response(comment.data, status=status.HTTP_201_CREATED)
        return Response(comment.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return redirect('/auth/login/')