from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/', include('django.contrib.auth.urls')),
    path('register', views.register, name='registration'),
    path('collections/', views.collection_list, name='collections'),#/collection/
    path('collections/new/', views.new_collection, name='new_collection'),
    path('collections/<int:collection_id>/', views.collection, name='collection'),
    path('collections/<int:collection_id>/new/', views.new_item, name='new_item'),
    path('collections/<int:collection_id>/<int:item_id>/', views.item, name='item'),
    path('collections/<int:collection_id>/groups/', views.group_list, name='groups'),
    path('collections/<int:collection_id>/groups/new/', views.new_group, name='new_group'),
    path('collections/<int:collection_id>/groups/<int:group_id>/', views.group, name='group')
]
