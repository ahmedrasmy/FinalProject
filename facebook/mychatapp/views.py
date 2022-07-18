import re

from django.shortcuts import render, redirect
from Home.models import *
from .forms import ChatMessageForm
from django.http import JsonResponse
import json

# Create your views here.
def register_user(request):
    if request.method == 'POST':
        # name_regex = r"^[a-zA-Z ,.'-]+$"
        # email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        # phone_regex = r'^01[0125][0-9]{8}$'
        # if (re.search(name_regex, request.POST['firstname']) == None):
        #     context = {}
        #     context['errorfname'] = 'This First Name Is Not Valid Enter Valid Name'
        #     return render(request, 'index.html', context)
        # if (re.search(name_regex, request.POST['lastname']) == None):
        #     context = {}
        #     context['errorlname'] = 'This Last Name Is Not Valid Enter Valid Name'
        #     return render(request, 'index.html', context)
        # if (re.search(email_regex, request.POST['Email']) == None):
        #     context = {}
        #     context['erroremail'] = 'This Email Is Not Valid Enter Valid Email'
        #     return render(request, 'index.html', context)
        # if (re.search(phone_regex, request.POST['phone']) == None):
        #     context = {}
        #     context[ 'errorphone'] = 'Phone number must be entered in the format: "01[0125][0-9]{8}". Exactly 11 digits allowed.'
        #
        #     return render(request, 'index.html', context)
        if (request.POST['password'] == request.POST['confirm']):
            newuser = Useraccount.objects.create(
                first_name=request.POST['firstname'], last_name=request.POST['lastname'],
                email=request.POST['Email'], password=request.POST['password'],
                phone_number=request.POST['phone'],
                birthdate=request.POST['birthdate'],
                # address=request.POST['address'],
            )
            newuser.save()
            return redirect('index')
        else:
            context = {}
            context['notequal'] = 'Password And Repeat Password Not Equal'
            return render(request, 'index.html', context)
    else:
        return render(request, 'index.html')

def login(request):
    if request.method == 'POST':
        loguser = Useraccount.objects.filter(email=request.POST['Email'], password=request.POST['password'])

        if len(loguser) > 0:
            request.session['user_name'] = loguser[0].first_name + " " + loguser[0].last_name
            request.session['user_id'] = loguser[0].id
            return redirect('index')
        else:
            return render(request, 'index.html', {'error': 'Invalid Credientials'})
    else:
        return render(request, 'index.html')

def logout(request):
    if request.session.has_key('user_name'):
        del request.session['user_name']
        del request.session['user_id']
        return redirect('login')
    return redirect('login')

def index(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friends = Friends.objects.filter(user=user.id)
        context = {"user": user, "friends": friends}
        return render(request, "mychatapp/index.html", context)
    else:
        return redirect('login')

def detail(request,pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friend = Friends.objects.filter(friend=pk,user=user.id)[0]
        # profile = Profile.objects.get(id=friend.profile.id)
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
        return redirect('login')
def sentMessages(request, pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friend = Friends.objects.filter(friend=pk, user=user.id)[0]
        data = json.loads(request.body)
        new_chat = data["msg"]
        new_chat_message = ChatMessage.objects.create(body=new_chat, msg_sender=user, msg_receiver=friend, seen=False )
        print(new_chat)
        return JsonResponse(new_chat_message.body, safe=False)
    else:
        return redirect('login')
def receivedMessages(request, pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friend = Friends.objects.filter(friend=pk, user=user.id)[0]
        arr = []
        chats = ChatMessage.objects.filter(msg_sender=friend, msg_receiver=user)
        for chat in chats:
            arr.append(chat.body)
        return JsonResponse(arr, safe=False)
    else:
        return redirect('login')

def chatNotification(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        friends = Friends.objects.filter(user=user.id)
        arr = []
        for friend in friends:
            chats = ChatMessage.objects.filter(msg_sender__id=friend.user.id, msg_receiver=user, seen=False)
            arr.append(chats.count())
        return JsonResponse(arr, safe=False)
    else:
        return redirect('login')

def home(request):
    return render(request, 'index.html')