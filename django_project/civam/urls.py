from django.urls import path, include

from . import views
from . import api_views

urlpatterns = [
    # Display collections
    path('', views.collection_list, name='index'),
    path('collections/', views.collection_list, name='collections'),#/collection/
    path('api/collections/', api_views.collection_list, name="api_collections"),

    # Search
    path('search-result/', views.searchResult, name="searchResult"),
    path('api/search-result/', api_views.searchResult, name="searchResult"),

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
    path('api/keywords/', api_views.search_keyword, name='search_keyword'),

    path('api/narratives/', api_views.add_narrative, name='add_narrative'),

    # View CollectionGroups of a Collection
    path('collections/<int:collection_id>/groups/', views.group_list, name='groups'),

    # Add a new CollectionGroup to a Collection
    path('collections/<int:collection_id>/groups/new/', views.new_group, name='new_group'),

    # View/Edit a CollectionGroup
    path('collections/<int:collection_id>/groups/<int:group_id>/', views.group, name='group'),

    # View/Edit a MapDataEntry
    path('mapdata/<int:mapdata_id>/', views.get_mapdata_by_id, name='mapdata_by_id'),
    # Add a new MapData
    path('mapdata/new/', views.new_mapdata, name='new_mapdata'),
    path('mapdata/', views.mapdata, name="mapdata"),
    
    # API Calls
    path('api/mapdata/all/', api_views.get_all_mapdata, name='all_mapdata'),
    path('api/mapdata/<int:mapdata_id>/', api_views.get_mapdata_by_id, name='mapdata_by_id'),
    path('api/mapdata/bulk/<str:map_api>/', api_views.insert_bulk_map_data, name='insert_bulk_map_data'),

    path('api/mapdata/cache/<str:detail>/', api_views.get_current_map, name="get_current_map"),
    # View SiteTexts
    path('api/sitetext/<str:loc>', api_views.get_site_text, name='api_get_site_text'),

    # New News Article
    path('article/<int:article_id>/', views.get_news_article_by_id, name='news_article_by_id'),
    # Add a new MapData
    path('article/new/', views.new_news_article, name='new_news_article'),
    path('article/', views.news_article, name="news_article"),

    path('api/article/all/', api_views.get_all_news_article, name='all_news_article'),
    path('api/article/tag/', api_views.get_news_article_by_tag, name='news_article_by_tag'),
    path('api/article/id/<int:article_id>/', api_views.get_news_article_by_id, name='news_article_by_id'),

    # New News Article
    path('api/newstag/<int:newstag_id>/', api_views.get_news_tag_by_id, name='news_tag_by_id'),
    # Add a new MapData
    path('newstag/new/', views.new_news_tag, name='new_news_tag'),
    path('newstag/', views.news_tag, name="news_tag"),

    path('api/explore/all/', api_views.get_all_explores, name='all_explores')
]
