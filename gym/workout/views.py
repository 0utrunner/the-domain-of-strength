from django.shortcuts import render
import json
import requests as HTTP_Client
import requests
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from .models import Warrior as User
from .models import Log
from rest_framework.decorators import api_view
from django.core import serializers
from django.forms.models import model_to_dict
import os
from dotenv import load_dotenv

load_dotenv()

valid = os.environ['apikey']


def intro(request):
    intro = open('static/index.html').read()
    return HttpResponse(intro)


@api_view(['POST'])
def sign_up(request):
    try:
        User.objects.create_user(
            username=request.data['username'], password=request.data['password'])
    except Exception as e:
        return HttpResponse(500)
    return HttpResponse('successful signup')


@api_view(['POST'])
def record(request):
    warrior = User.objects.latest('last_login')
    try:
        Log.objects.create(
            exercise=request.data['exercise'], sets=request.data['sets'], reps=request.data['reps'], pounds=request.data['pounds'], warrior_id=warrior.pk)
    except Exception as e:
        print(str(e))
    return HttpResponse('successful save')


@api_view(['POST'])
def log_in(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            try:
                login(request._request, user)
            except Exception as e:
                return HttpResponse(100)
            return HttpResponse('success!')
        else:
            return HttpResponse(100)
    else:
        return HttpResponse(100)


@api_view(['POST'])
def log_out(request):
    logout(request)
    return JsonResponse({'success': True})


@api_view(['GET'])
def warrior(request):
    warrior = User.objects.all()
    data = serializers.serialize("json", warrior, fields=['username'])
    return HttpResponse(data)


@api_view(['GET'])
def workout(request):
    warrior = User.objects.latest('last_login')
    workout = Log.objects.filter(warrior=warrior.pk)
    data = serializers.serialize("json", workout)
    return HttpResponse(data)


@api_view(['GET', 'DELETE', 'PUT'])
def get_workout(request, workout_id):
    if request.method == "GET":
        workout = Log.objects.get(id=workout_id)
    if request.method == "DELETE":
        workout = Log.objects.get(id=workout_id)
        workout.delete()
    if request.method == 'PUT':
        workout = Log.objects.get(id=workout_id)
        Log.objects.filter(id=workout.id).update(
            exercise=request.data['exercise'], sets=request.data['sets'], reps=request.data['reps'], pounds=request.data['pounds'], warrior_id=workout.warrior_id)
    return JsonResponse(model_to_dict(workout))


@api_view(['GET'])
def greatest(request):
    warrior = User.objects.latest('last_login')
    workout = Log.objects.filter(warrior=warrior.pk).order_by('-pounds')
    data = serializers.serialize("json", workout)
    return HttpResponse(data)


def arms(request):
    muscle = 'biceps'
    api_url = 'https://api.api-ninjas.com/v1/exercises?type=strength&muscle={}'.format(
        muscle)
    response = requests.get(
        api_url, headers={'X-Api-Key': valid})
    if response.status_code == requests.codes.ok:
        return HttpResponse(response.text)
    else:
        print("Error:", response.status_code, response.text)


def back(request):
    muscle = 'middle_back'
    api_url = 'https://api.api-ninjas.com/v1/exercises?type=strength&muscle={}'.format(
        muscle)
    response = requests.get(
        api_url, headers={'X-Api-Key': valid})
    if response.status_code == requests.codes.ok:
        return HttpResponse(response.text)
    else:
        print("Error:", response.status_code, response.text)


def chest(request):
    muscle = 'chest'
    api_url = 'https://api.api-ninjas.com/v1/exercises?type=strength&muscle={}'.format(
        muscle)
    response = requests.get(
        api_url, headers={'X-Api-Key': valid})
    if response.status_code == requests.codes.ok:
        return HttpResponse(response.text)
    else:
        print("Error:", response.status_code, response.text)


def core(request):
    muscle = 'abdominals'
    api_url = 'https://api.api-ninjas.com/v1/exercises?type=strength&muscle={}'.format(
        muscle)
    response = requests.get(
        api_url, headers={'X-Api-Key': valid})
    if response.status_code == requests.codes.ok:
        return HttpResponse(response.text)
    else:
        print("Error:", response.status_code, response.text)


def legs(request):
    muscle = 'quadriceps'
    api_url = 'https://api.api-ninjas.com/v1/exercises?type=strength&muscle={}'.format(
        muscle)
    response = requests.get(
        api_url, headers={'X-Api-Key': valid})
    if response.status_code == requests.codes.ok:
        return HttpResponse(response.text)
    else:
        print("Error:", response.status_code, response.text)
