from django.shortcuts import render, redirect
from Home.models import *

from django.http import JsonResponse
import json


def detail (request,pk):
    return render(request, 'index.html')


def index(request):
    return render(request, 'index.html')

