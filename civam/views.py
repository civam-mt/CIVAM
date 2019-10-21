from django.shortcuts import render
from django.http import HttpResponse
from guardian.shortcuts import assign_perm, get_perms, remove_perm
from civam.models import Item, Collection


# Create your views here.
def index(request):
    return HttpResponse("Hello, world!")

def item(request, obj):
    item = Item.objects.get(name__iexact=obj)
    if request.user.has_perm("civam.can_view",item):
        return HttpResponse("Item Page")
    else:
        return HttpResponse(str(request.user)+" cannot view this item")

def collection(request, obj):
    collection = Collection.objects.get(title__iexact=obj)
    if request.user.has_perm("civam.can_view",collection):
        return HttpResponse("Collection Page")
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
