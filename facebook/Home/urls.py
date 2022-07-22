from django.urls import path
from .views import *

urlpatterns = [
    # path('', home, name= "home"),
    path('addpost/', addpost, name="addpost"),
    path('addcomment/<int:pk>', addcomment, name="addcomment"),
    path('Account/<str:id>/', Account, name='Account'),
    path('search/', search, name='search'),
    path('friendRequests/', friendRequests, name='friendRequests'),
    path('frined_request_delete/', frined_request_delete, name='frined_request_delete'),
    path('frined_request_accept/', frined_request_accept,name='frined_request_accept'),
    path('unfriend/', unfriend, name='unfriend'),
    path('cancel_friend_request/', cancel_friend_request,name='cancel_friend_request'),
    path('Friends_list/', Friends_list, name='Friends_list'),
    path('Home/', home, name='home'),
    path('profile/', profile, name='Profile'),
    path('updateprofile/', updateprofile, name='updateprofile')
]
