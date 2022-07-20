from django.urls import path
from .views import *

urlpatterns = [
    # path('', home, name= "home"),
    path('addpost/', addpost, name="addpost"),
    path('addcomment/<int:pk>', addcomment, name = "addcomment"),
    path('Account/<str:id>/<str:pk>',Account , name='Account'),
    path('search/',search , name='search'),
    
]
