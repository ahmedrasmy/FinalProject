from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse
import json


def pro(request,id):
    return render(request, 'index.html')


def home(request):
    if request.session.has_key('user_name'):
        return render(request, 'index.html')
    else:
        return redirect('/auth/login/')


def updateprofile(request):
    user = Useraccount.objects.get(id=int(request.session['user_id']))
    if request.FILES['pic'] :
        user.pic = request.FILES['pic']
        user.save()
        newPost = Posts.objects.create(
            user=user, postcontent="update his profile picture"
        )
        images = request.FILES['pic']
        photo = Photos.objects.create(
            post=newPost,
            imagecontent=user.pic
        )
        photo.save()

    if request.FILES['cover'] :
        user.pic_cover = request.FILES['cover']
        user.save()
        newPost = Posts.objects.create(
            user=user, postcontent="update his cover picture"
        )
        photo = Photos.objects.create(
            post=newPost,
            imagecontent=user.pic_cover
        )
        photo.save()
    return redirect('/home/pro/'+str(request.session['user_id']))

def addpost(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        newPost = Posts.objects.create(
            user=user, postcontent=request.POST['postcontent']
        )
        images = request.FILES.getlist('imagecontent')
        print(images)
        if newPost:
            if len(images) > 0:
                for imagecontent in images:
                    photo = Photos.objects.create(
                        post=newPost,
                        imagecontent=imagecontent
                    )
                    photo.save()
        return redirect('home')
    else:
        return redirect('/auth/login/')


def addcomment(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        post = Posts.objects.get(id=request.POST['post_id'])
        newComment = Comments.objects.create(
            user=user, post=post, commentcontent=request.POST['commentcontent']
        )
        newComment.save()
        return redirect('home')
    else:
        return redirect('/auth/login/')

def search(request):
    return render(request, 'index.html')


def send_friend_request(request):
    pk = int(request.session['user_id'])
    user = Useraccount.objects.get(id=pk)
    payload = {}
    if request.session.has_key('user_name'):
        user_id = request.POST['send_friend_request']
        if user_id:
            receiver = Useraccount.objects.get(pk=user_id)
            try:
                # Get any friend requests (active and not-active)
                friend_requests = FriendRequest.objects.filter(
                    sender=user, reciver=receiver)
                # find if any of them are active (pending)
                try:
                    for request in friend_requests:
                        if request.is_active:
                            raise Exception("You already sent them a friend request.")
                    # If none are active create a new friend request
                    friend_request = FriendRequest(
                        sender=user, reciver=receiver)
                    friend_request.save()
                    payload['response'] = "Friend request sent."
                except Exception as e:
                    payload['response'] = str(e)
            except FriendRequest.DoesNotExist:
                # There are no friend requests so create one.
                friend_request = FriendRequest(
                    sender=user, reciver=receiver)
                friend_request.save()
                payload['response'] = "Friend request sent."

            if payload['response'] == None:
                # this return  need to change return some thimg to say some thing went try again leterrr
                return redirect('/auth/login/')
        else:
            # this return need to change to
            return redirect('/auth/login/')
    else:
        return redirect('/auth/login/')

    return redirect('/home/pro/'+request.POST['send_friend_request'])
    # return HttpResponse(json.dumps(payload), content_type="application/json")


def friendRequests(request):
    return render(request, 'index.html')


def frined_request_delete(request):
    if request.session.has_key('user_name'):
        friend_request = FriendRequest.objects.get(
            id=int(request.POST['request_id']))
        friend_request.delete()
        return redirect('friendRequests')
    else:
        return redirect('/auth/login/')


def frined_request_accept(request):
    if request.session.has_key('user_name'):
        pk = int(request.session['user_id'])
        user = Useraccount.objects.get(id=pk)
        user_friend_list = FrienList.objects.get(user=user)
        sender = Useraccount.objects.get(id=request.POST['sender_id'])
        sender_friend_list = FrienList.objects.get(user=sender)
        sender_friend_list.add_friend(user)
        user_friend_list.add_friend(sender)
        friend_request = FriendRequest.objects.get(
            id=request.POST['request_id'])
        friend_request.delete()
        return redirect('friendRequests')
    else:
        return redirect('/auth/login/')


def unfriend(request, method='POST'):
    if request.session.has_key('user_name'):
        pk = int(request.session['user_id'])
        user = Useraccount.objects.get(id=pk)
        removee = Useraccount.objects.get(id=request.POST['unfriend'])
        friend_list = FrienList.objects.get(user=user)
        friend_list.unfriend(removee)
        return redirect('/home/pro/' + request.POST['unfriend'])
    else:
        return redirect('/auth/login/')


def cancel_friend_request(request, method='POST'):
    if request.session.has_key('user_name'):
        pk = int(request.session['user_id'])
        user = Useraccount.objects.get(id=pk)
        receiver = Useraccount.objects.get(id=request.POST['cancel_request'])
        friend_requests = FriendRequest.objects.filter(
            sender=user, reciver=receiver, is_active=True)
        if len(friend_requests) > 1:
            for request in friend_requests:
                request.cancel()
        friend_requests.delete()
        return redirect('/home/pro/' + request.POST['cancel_request'])
    else:
        return redirect('/auth/login/')

def Friends_list(request):
    return render(request, 'index.html')


def Bio(request,method='POST'):
    user = Useraccount.objects.get(id=int(request.session['user_id']))
    user.Bio = request.POST['BioInput']
    user.save()
    return redirect('/home/pro/'+str(request.session['user_id']))
