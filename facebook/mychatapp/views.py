from django.shortcuts import render, redirect
from Home.models import *
from .forms import ChatMessageForm
from django.http import JsonResponse
import json

def detail(request,pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friend = friend_list[0].friends.get(id=pk)
        print(friend)
        chats = ChatMessage.objects.all()
        rec_chats = ChatMessage.objects.filter(msg_sender=friend, msg_receiver=user, seen=False)
        rec_chats.update(seen=True)
        form = ChatMessageForm()
        if request.method == "POST":
            form = ChatMessageForm(request.POST)
            if form.is_valid():
                chat_message = form.save(commit=False)
                chat_message.msg_sender = user
                chat_message.msg_receiver = friend
                chat_message.save()
                return redirect("detail", pk=friend.id)
        context = {"friend": friend, "form": form, "user":user, "chats": chats, "num": rec_chats.count()}
        return render(request, "mychatapp/detail.html", context)
    else:
        return redirect('/auth/login/')
def sentMessages(request, pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friend = friend_list[0].friends.get(id=pk)
        data = json.loads(request.body)
        new_chat = data["msg"]
        new_chat_message = ChatMessage.objects.create(body=new_chat, msg_sender=user, msg_receiver=friend, seen=False )
        print(new_chat)
        return JsonResponse(new_chat_message.body, safe=False)
    else:
        return redirect('/auth/login/')
def receivedMessages(request, pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friend = friend_list[0].friends.get(id=pk)
        arr = []
        chats = ChatMessage.objects.filter(msg_sender=friend, msg_receiver=user)
        for chat in chats:
            arr.append(chat.body)
        return JsonResponse(arr, safe=False)
    else:
        return redirect('/auth/login/')

def chatNotification(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friends = friend_list[0].friends.all()
        arr = []
        for friend in friends:
            chats = ChatMessage.objects.filter(msg_sender__id=friend.user.id, msg_receiver=user, seen=False)
            arr.append(chats.count())
        return JsonResponse(arr, safe=False)
    else:
        return redirect('/auth/login/')


def index(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(
            id=int(request.session['user_id']))[0]
        friend_list = FrienList.objects.filter(user=user.id)
        friends =friend_list[0].friends.all()
        context = {"user": user, "friends": friends}
        return render(request, "mychatapp/index.html", context)
    else:
        return redirect('/auth/login/')
