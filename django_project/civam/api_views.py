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

def register(request):
	if (request.method == 'POST'):
		uname = request.user
		fname = request.first_name
		lname = request.last_name
		email = request.email
		created_by = request.user
		modified_by = request.user
		u = user(username=uname, fist_name=fname, last_name=lname, email=email, created_by=created_by, modified_by=modified_by)
		u.save()
		return u.id
	else:
		return 0
'''
def new_collection(request):
	form = CollectionForm(request.POST or None)
	if (request.method == 'POST'):
		if form.is_valid():
			col_instance = form.save(commit=False)
			col_instance.created_by = request.user
			col_instance.modified_by = request.user
			col_instance.save
			#return idk man
			return
	context = {'collection_form': form}
	return JsonResponse(context, safe=False)
'''

def item(request, collection_id, item_id):
    item = get_object_or_404(Item, pk=item_id)

    # Submitting a story
	if(request.method == 'POST'):
		name = request.name
		description = request.description
		collection = request.collection
		created_by = request.user
		modified_by = request.user
		i = item(name=name, description=description, collection=collection, created_by=created_by, modified_by=modified_by)
		i.save()  
    		return i.id

    # Display stories
    stories = Story.objects.filter(item_id=item_id)

    # Display images
    try :
        image = Image.objects.filter(item_id=item_id)
    except Image.DoesNotExist:
        image = None

    # TODO: Display videos

    # StoryForm with author auto filled to User's name
    context = {'item': list(item.values()), 'stories': list(stories.values()), 'images': list(image.values())}
    return JsonResponse(context, safe=False)




# Display list of Items in a Collection
# Uncomment line below to only show Collection if the User has permission to
# @permission_required('civam.view_collection', (Collection, 'id', 'collection_id'), return_403=True)
def collection(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    
    item_list = Item.objects.filter(collection=collection)
    #item_list = get_objects_for_user(request.user, 'civam.view_item', item_list, accept_global_perms=False)
    context = {'item_list': list(item_list.values()), 
    'title': collection.title,
    'description': collection.description}
    return JsonResponse(context, safe=False)

def item(request, collection_id, item_id):
	item = get_object_or_404(Item, pk=item_id)

    # Submitting a story
	if(request.method == 'POST'):
		name = request.name
		description = request.description
		collection = request.collection
		created_by = request.user
		modified_by = request.user
		i = item(name=name, description=description, collection=collection, created_by=created_by, modified_by=modified_by)
		i.save()
		return i.id

    # Display stories
	stories = Story.objects.filter(item_id=item_id)

    # Display images
	try :
		image = Image.objects.filter(item_id=item_id)
	except Image.DoesNotExist:
		image = None

    # TODO: Display videos
#	print(item.value())
    # StoryForm with author auto filled to User's name
	context = {'item': item.id, 'name': item.name, 'description': item.description, 'collection_id': item.collection.id, 'stories': list(stories.values()), 'images': list(image.values())}
	return JsonResponse(context, safe=False)

def register(request):
	if (request.method == 'POST'):
		uname = request.user
		fname = request.first_name
		lname = request.last_name
		email = request.email
		created_by = request.user
		modified_by = request.user
		u = user(username=uname, fist_name=fname, last_name=lname, email=email, created_by=created_by, modified_by=modified_by)
		u.save()
		return u.id
	else:
		return 0
