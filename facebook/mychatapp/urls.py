from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('detail/<str:pk>/', detail, name="detail")
]
