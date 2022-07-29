from django.urls import path
from .views import *

urlpatterns = [
    # path('', home, name= "home"),
    path('addpost/', addpost, name="addpost"),
    path('addcomment/', addcomment, name="addcomment"),
    path('search/', search, name='search'),
    path('send_friend_request/', send_friend_request, name='send_friend_request'),
    path('friendRequests/', friendRequests, name='friendRequests'),
    path('frined_request_delete/', frined_request_delete, name='frined_request_delete'),
    path('frined_request_accept/', frined_request_accept, name='frined_request_accept'),
    path('unfriend/', unfriend, name='unfriend'),
    path('cancel_friend_request/', cancel_friend_request, name='cancel_friend_request'),
    path('Friends_list/', Friends_list, name='Friends_list'),
    path('friend_request/<str:id>', send_friend_request, name='friend-request'),
    path('Home/', home, name='home'),
    path('updateprofile/', updateprofile, name='updateprofile'),
    #path('pro/', pro, name='pro'),
    path('pro/<str:id>', pro, name='pro'),
    path('Bio/',Bio, name='Bio'),
    path('sugistions_list/', sugistions_list, name='sugistions_list'),
    path('cancel_friend_request_sugustions/',cancel_friend_request_sugustions, name='cancel_friend_request_sugustions'),
    path('frined_request_delete_sugustions/', frined_request_delete_sugustions,name='frined_request_delete_sugustions'),
    path('frined_request_accept_sugustions/',frined_request_accept_sugustions, name='frined_request_accept_sugustions'),
    path('Post/<post_id>/', Post,name='Post'),
]
