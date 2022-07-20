from django.urls import path
from .views import *

urlpatterns = [
    # path('', home, name= "home"),
    path('addpost/', addpost, name="addpost"),
    path('addcomment/<int:pk>', addcomment, name = "addcomment"),
    path('addpage/<str:pk>', addpage, name = "addpage"),
    
]
