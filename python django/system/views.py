from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Kindergarten Backend!")

from django.http import JsonResponse
from .models import Student

def get_students(request):
    students = list(Student.objects.values())
    return JsonResponse(students, safe=False)