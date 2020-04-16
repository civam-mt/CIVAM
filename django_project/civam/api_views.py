from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, HttpResponseRedirect
from guardian.shortcuts import assign_perm, remove_perm, get_objects_for_user, get_objects_for_group
from guardian.decorators import permission_required
from .models import *
from .forms import *

from guardian.models import Group
from django.http import JsonResponse
from django.core import serializers


# Civam views defined here

# TODO, add forms/views for editing/deleting Items, Collections, Stories, Images, Videos, and CollectionGroups

def index(request):
    return HttpResponse("index")

def collection_list(request):
    collection_list = Collection.objects.filter(public=True)
    # Uncomment line below filter out Colletions a user doesn't have permissions to view
    #collection_list = get_objects_for_user(request.user, 'civam.view_collection', collection_list, accept_global_perms=False)
    context = {'collection_list' : list(collection_list.values())}

    return JsonResponse(context, safe=False)
    #return render(request, 'civam/collection_list.html', context)


# Display list of Items in a Collection
# Uncomment line below to only show Collection if the User has permission to
# @permission_required('civam.view_collection', (Collection, 'id', 'collection_id'), return_403=True)
def collection(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    
    item_list = Item.objects.filter(collection=collection)
    item_list = get_objects_for_user(request.user, 'civam.view_item', item_list, accept_global_perms=False)
    context = {'item_list': list(item_list.values()), 
    'title': collection.title,
    'description': collection.description}
    return JsonResponse(context, safe=False)