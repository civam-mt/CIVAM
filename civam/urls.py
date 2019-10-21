from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('collections/', views.collection_list, name='collections'),#/collection/
    path('collections/<int:collection_id>', views.collection, name='collection'),
    path('collections/<int:collection_id>/<int:item_id>', views.item, name='item'),
    path('grant_perm/<obj_type>/<obj>/<slug:permi>',views.grant_perm, name='grant_perm'),
    path('revoke_perm/<obj_type>/<obj>/<slug:permi>', views.revoke_perm, name='revoke_perm')

]
