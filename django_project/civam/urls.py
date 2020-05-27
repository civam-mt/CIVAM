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
    #path('api/register/', api_views.register, name='api_registration'),

    # Make a new collection
    path('collections/new/', views.new_collection, name='new_collection'),
    #path('api/collection/new', api_views.register, name='api_new_collection'),
    
    # View a collection by collection_id
    path('collections/<int:collection_id>/', views.collection, name='collection'),
    path('api/collections/<int:collection_id>/', api_views.collection, name="api_collection"),


    # Create a new item within collection
    path('collections/<int:collection_id>/new/', views.new_item, name='new_item'),
    
    path('api/collections/<int:collection_id>/<int:item_id>/', api_views.item, name='api_item'),

    path('api/items/<int:item_id>/', api_views.item_solo, name='api_item_solo'),
    path('api/items/all/', api_views.all_items, name='api_all_items'),
    path('api/items/all/<str:keyword>', api_views.get_by_keyword, name='api_get_by_keyword'),
    # View an item within a collection
    path('collections/<int:collection_id>/<int:item_id>/', views.item, name='item'),
    path('api/collections/<int:collection_id>/<int:item_id>/', api_views.item, name='api_item'),

    path('api/pori/<int:pori_id>/', api_views.get_pori, name='api_get_pori'),
    path('api/pori/all/', api_views.all_pori, name='api_all_pori'),
    path('api/keywords/all/', api_views.all_keywords, name='api_all_keywords'),



    # View CollectionGroups of a Collection
    path('collections/<int:collection_id>/groups/', views.group_list, name='groups'),

    # Add a new CollectionGroup to a Collection
    path('collections/<int:collection_id>/groups/new/', views.new_group, name='new_group'),

    # View/Edit a CollectionGroup
    path('collections/<int:collection_id>/groups/<int:group_id>/', views.group, name='group')

]
