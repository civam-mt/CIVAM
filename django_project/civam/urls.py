from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('item/<obj>', views.item, name='item'),
    path('collection/<obj>', views.collection, name='collection'),
    path('grant_perm/<obj_type>/<obj>/<slug:permi>',views.grant_perm, name='grant_perm'),
    path('revoke_perm/<obj_type>/<obj>/<slug:permi>', views.revoke_perm, name='revoke_perm')
]
