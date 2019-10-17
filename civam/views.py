from django.shortcuts import render, get_object_or_404
from django.shortcuts import HttpResponse
from .models import *

# Create your views here.
def index(request):
    item_list = Item.objects.all()
    context = {'item_list' : item_list}
    return render(request, 'civam/index.html' ,context)

def new(request):
    return HttpResponse("New item")

def detail(request, item_id):
    item = get_object_or_404(Item, pk=item_id)
    stories = Story.objects.filter(item_id=item_id)
    context = {'item' : item, 'stories': stories}
    return render(request, 'civam/item.html', context)
