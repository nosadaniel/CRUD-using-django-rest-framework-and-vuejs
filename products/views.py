from django.shortcuts import render, get_list_or_404
from django.http import HttpResponse

def home(request):
    return render(request, 'products/index.html')

# Create your views here.
