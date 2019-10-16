from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),#/collection/
    path('<int:item_id>/', views.detail, name='detail'), #/collection/<item>/
    path('new/', views.new, name='new' ) #/collection/new 
]
