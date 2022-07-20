from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse
import json




def addpost(request):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        newPost=Posts.objects.create(
            user=user,postcontent=request.POST['postcontent']
        )
        images = request.FILES.getlist('imagecontent')
        if newPost:
            if len(images) > 0:
                for imagecontent in images:
                    photo = Photos.objects.create(
                        post=newPost,
                        imagecontent=imagecontent
                    )
        return redirect('home')
    else:
        return redirect('login')

def addcomment(request,pk):
    if request.session.has_key('user_name'):
        user = Useraccount.objects.filter(id=int(request.session['user_id']))[0]
        post = Posts.objects.get(id=pk)
        newComment=Comments.objects.create(
            user=user,post=post,commentcontent=request.POST['commentcontent']
        )
        return redirect('home')
    else:
        return redirect('login')


def Account(request,id,pk):
    return render(request, 'index.html')


def search(request):
    return render(request, 'index.html')