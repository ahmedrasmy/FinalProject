from django.urls import path
from .views import *

urlpatterns = [
    path('Home/',home , name='Home'),
    path('profile/',profile , name='Profile'),
    path('search/',search , name='search'),
    path('updateprofile/',updateprofile , name='updateprofile'),
    path('account/<str:id>',Account , name='Account'),
    path('friend_request/<str:id>', send_friend_request, name='friend-request'),
    path('friendRequests/', friendRequests, name='friendRequests'),
    path('frined_request_delete/', frined_request_delete , name='frined_request_delete'),
    path('frined_request_accept/', frined_request_accept,
        name='frined_request_accept'),
    path('unfriend/', unfriend, name='unfriend'),
    path('cancel_friend_request/', cancel_friend_request,
        name='cancel_friend_request'),
    path('Friends_list/', Friends_list, name='Friends_list'),
]
