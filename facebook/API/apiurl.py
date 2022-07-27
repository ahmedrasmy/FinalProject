"""DjangoD4 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.Home, name='Home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='Home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework.response import Response
from rest_framework import status
from .serlizer import *

urlpatterns = [
    path('get/', view_users),
    path('register_user/', register_user),
    path('update_user/<pk>', update_user),
    path('delete_user/<pk>', delete_user),
    path('getAllPosts/', getAllPosts),
    path('getProfilePosts/', getProfilePosts),
    path('getComments/<pk>', getComments),
    path('friend_requests/', friend_requests),
    path('friends_list_chat/', friends_list_chat, name='friends_list_chat'),
    path('friends_list/<id>',friends_list,name='friends_list'),
    path('get_one_user/<id>', get_one_user, name='get_one_user'),
    path('get_one_user_Posts/<id>', get_one_user_Posts, name='get_one_user_Posts'),
    path('get_all/', get_all, name='get_all'),
    path('detail/<pk>', detail, name='detail'),
    path('detail_counter/<pk>', detail_counter, name='detail_counter'),
    path('chatIndex/', chatIndex, name="chatIndex"),
    path('chatNotification/', chatNotification, name="chatNotification"),
    path('sent_msg/<str:pk>', sentMessages, name="sent_msg"),
    path('rec_msg/<str:pk>', receivedMessages, name="rec_msg"),
    path('story/', story, name="story"),
    path('get_all_users/<name>', get_all_users, name="get_all_users"),
    path('addStory/', addStory, name="addStory"),
    path('get_like/', get_Like, name='get_like'),
    path('get_likee/', get_Likee, name='get_like'),
    path('delete_like/<pk>', delete_like, name='del_like'),
    path('addpost/', addpost, name='addpost'),
    path('addcomment/', addcomment, name='addcomment'),
    path('friends_list_contacts/', friends_list_contacts, name='friends_list_contacts'),
    path('deleteStory/<pk>', deleteStory, name='deleteStory'),

]
