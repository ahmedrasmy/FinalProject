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
from unicodedata import name
from django.contrib import admin
from django.urls import path

from .views import *
from rest_framework.response import Response
from rest_framework import status
from .serlizer import *

urlpatterns = [
    path('get/',view_user),
    path('insert/',create_user),
    path('update/<pk>', update),
    path('delete/<pk>', delete),
    path('getAccount/<id>',account_view),
    path('friend_requests/', friend_requests),
    path('friends_list/',friends_list,name='friends_list'),
    path('get_posts/', get_posts, name='get_posts'),
]
