from django.shortcuts import render, redirect
from .models import *

def pro(request,id):
    return render(request, 'index.html')

def sugistions_list(request):
    return render(request, 'index.html')

def home(request):
    if request.session.has_key('user_name'):
        return render(request, 'index.html')
    else:
        return redirect('/auth/login/')



def search(request):
    return render(request, 'index.html')


def group(request,id):
    return render(request, 'index.html')


def friendRequests(request):
    return render(request, 'index.html')



def Friends_list(request):
    return render(request, 'index.html')


def Post(request, id):
    return render(request, 'index.html')


def group_people(request, id):
    return render(request, 'index.html')


def groups(request):
    return render(request, 'index.html')



