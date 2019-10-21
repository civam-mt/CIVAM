from django.shortcuts import render, get_object_or_404
from django.shortcuts import HttpResponse
from .models import *
from guardian.shortcuts import assign_perm, get_perms, remove_perm, get_perms_for_model



# Create your views here.
def index(request):
    return HttpResponse("index")

def collection_list(request):
    collection_list = Collection.objects.all()
    print(collection_list)
    context = {'collection_list' : collection_list}
    return render(request, 'civam/collection_list.html' ,context)

def item(request, collection_id, item_id):
    item = get_object_or_404(Item, pk=item_id)
    stories = Story.objects.filter(item_id=item_id)
    if not request.user.has_perm("civam.view_item",item):
        #add edit and delete options in template
        context = {'item': item, 'stories': stories}
        return render(request, 'civam/item.html', context)
    else:
        return HttpResponse(str(request.user)+" cannot view this item")

def collection(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    if not request.user.has_perm("civam.view_collection",collection):
        item_list = Item.objects.filter(collection=collection)
        context = {'item_list': item_list, 'collection': collection}
        #add edit and delete options in template
        return render(request, 'civam/collection.html', context)
    else:
        return HttpResponse(str(request.user)+" cannot view this collection")

def grant_perm(request, obj_type, obj, permi):
    if not obj:
        return HttpResponse("Select an object to give permissions to")
    elif obj_type.casefold() == "item":
        item = Item.objects.get(name__iexact=obj)
    elif obj_type.casefold() == "collection":
        item = Collection.objects.get(title__iexact=obj)
    else:
        return HttpResponse("Select an object type of the object")

    if not permi:
        return HttpResponse("No permission to grant")
    elif request.user.has_perm("civam."+permi, item):
        return HttpResponse("Permission *"+obj_type.capitalize()+" "+str(permi)+"* already granted")
    else:
        assign_perm("civam."+permi, request.user, item)
        return HttpResponse("Permission *"+obj_type.capitalize()+" "+str(permi)+"* granted")
      
def revoke_perm(request, obj_type, obj, permi):
    if not obj:
        return HttpResponse("Select an object to revoke permissions of")
    elif obj_type.casefold() == "item":
        item = Item.objects.get(name__iexact=obj)
    elif obj_type.casefold() == "collection":
        item = Collection.objects.get(title__iexact=obj)
    else:
        return HttpResponse("Select an object type of the object")

    if not permi:
        return HttpResponse("No permission to revoke")
    elif not request.user.has_perm("civam."+permi,item):
        return HttpResponse("Permission *"+obj_type.capitalize()+" "+str(permi)+"* already revoked")
    else:
        remove_perm(permi, request.user, item)
        return HttpResponse("Permission *"+obj_type.capitalize()+" "+str(permi)+"* revoked")

