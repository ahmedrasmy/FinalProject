from django.urls import path
from .views import *

urlpatterns = [
    path('search/', search, name='search'),
    path('friendRequests/', friendRequests, name='friendRequests'),
    path('Friends_list/', Friends_list, name='Friends_list'),
    path('Home/', home, name='home'),
    path('pro/<str:id>', pro, name='pro'),
    path('sugistions_list/', sugistions_list, name='sugistions_list'),
    path('Post/<str:id>/', Post, name='Post'),
    path('group/<id>/', group, name='group'),
    path('group/people/<id>/', group_people, name='group_people'),
    path('groups/', groups, name='groups'),
]
