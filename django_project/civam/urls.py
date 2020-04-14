from django.urls import path, include

from . import views
from . import api_views

urlpatterns = [
    # Display collections
    path('', views.collection_list, name='index'),
    path('collections/', views.collection_list, name='collections'),#/collection/
    path('api/collections/', api_views.collection_list, name="api_collections"),
  
    # Login and register
    path('user/', include('django.contrib.auth.urls')),
    path('register/', views.register, name='registration'),

    # Make a new collection
    path('collections/new/', views.new_collection, name='new_collection'),

    # View a collection by collection_id
    path('collections/<int:collection_id>/', views.collection, name='collection'),

    # Create a new item within collection
    path('collections/<int:collection_id>/new/', views.new_item, name='new_item'),

    # View an item within a collection
    path('collections/<int:collection_id>/<int:item_id>/', views.item, name='item'),

    # View CollectionGroups of a Collection
    path('collections/<int:collection_id>/groups/', views.group_list, name='groups'),

    # Add a new CollectionGroup to a Collection
    path('collections/<int:collection_id>/groups/new/', views.new_group, name='new_group'),

    # View/Edit a CollectionGroup
    path('collections/<int:collection_id>/groups/<int:group_id>/', views.group, name='group')

]
