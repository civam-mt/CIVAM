from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, HttpResponseRedirect
from guardian.shortcuts import assign_perm, remove_perm, get_objects_for_user, get_objects_for_group
from guardian.decorators import permission_required
from .models import *
from .forms import *

from guardian.models import Group
from django.http import JsonResponse
from django.core import serializers
import json
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

def item(request, collection_id, item_id):
    item = get_object_or_404(Item, pk=item_id)

    # Submitting a story
    # Display stories
    stories = Story.objects.filter(item_id=item_id)

    # Display images
    try :
        image = Image.objects.filter(item_id=item_id)
    except Image.DoesNotExist:
        image = None

    # TODO: Display videos
    try :
        video = Video.objects.filter(item_id=item_id)
    except Video.DoesNotExist:
        video = None

    context = {'item': list(item.values()), 'stories': list(stories.values()), 'images': list(image.values()), 'videos': list(video.values)}
    return JsonResponse(context, safe=False)

'''



# Display list of Items in a Collection
# Uncomment line below to only show Collection if the User has permission to
# @permission_required('civam.view_collection', (Collection, 'id', 'collection_id'), return_403=True)
def collection(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    
    item_list = Item.objects.filter(collection=collection)
    item_list = list(item_list.values())

    for item in item_list:
        del item["created_by_id"]
        del item["created_on"]
        del item["modified_by_id"]
        del item["collection_id"]
    #item_list = get_objects_for_user(request.user, 'civam.view_item', item_list, accept_global_perms=False)
    context = {
	'item_list': item_list, 
    'title': collection.title,
    'description': collection.description,
	'cover_image':collection.cover_image.name,
	'public':collection.public,
	'summary':collection.summary,
	'provenance':collection.provenance,
	'citation':collection.citation,
	'historical_note':collection.historical_note,
	'access_notes_or_rights_and_reproduction': collection.access_notes_or_rights_and_reproduction,
	'geographical_location':collection.geographical_location,

	"keywords": [{"id":x.id,"name":str(x)} for x in list(collection.keywords.all())],
	"creator": [{"id":x.id,"name":str(x)} for x in list(collection.creator.all())],
	"location_of_originals": [{"id":x.id,"name":str(x)} for x in list(collection.location_of_originals.all())]
	}
    return JsonResponse(context, safe=False)

def all_items(request):
	items = Item.objects.all()
	#item_list = list(item_list.values())
	item_list = []
	for item in items:
		new_item = {
			'item': item.id,
			'cover_image': item.cover_image.name,
			'name': item.name,
			'description': item.description,
			'collection': item.collection.id,
			'culture_or_community': item.culture_or_community,
			'other_forms': item.other_forms,
			'digital_heritage_item':item.digital_heritage_item,
			'date_of_creation':item.date_of_creation,
			'physical_details':item.physical_details,
			'access_notes_or_rights_and_reproduction':item.access_notes_or_rights_and_reproduction,
			'catalog_number':item.catalog_number,
			'external_link':item.external_link,
			'provenance':item.provenance,
			#'notes':item.notes,
			"place_created":item.place_created,
			'citation':item.citation,
			'historical_note':item.historical_note,

			"keywords": [{"id":x.id,"name":str(x)} for x in list(item.keywords.all())],
			"creator": [{"id":x.id,"name":str(x)} for x in list(item.creator.all())],
			#"place_created": [{"id":x.id,"name":str(x)} for x in list(item.place_created.all())],
			"location_of_originals": [{"id":x.id,"name":str(x)} for x in list(item.location_of_originals.all())]
		}
		item_list.append(new_item)


	context = {"items":item_list}
	return JsonResponse(context, safe=False)

def all_pori(request):
	poris = PersonOrInstitute.objects.all()
	#item_list = list(item_list.values())
	pori_list = []
	for pori in poris:
		new_pori = {
			"id": pori.id,
			"name": pori.name,
			"culture": pori.culture,
			"dates": pori.dates,
			"description":pori.description,
			"historical_note":pori.historical_note,
			"isPerson":pori.isPerson,
			"cover_image": pori.cover_image.name,
			"address": pori.address,
			"contact": pori.contact
		}
		pori_list.append(new_pori)


	context = {"poris":pori_list}
	return JsonResponse(context, safe=False)

def all_keywords(request):
	keywords = Keyword.objects.all()
	#item_list = list(item_list.values())
	keyword_list = []
	for kw in keywords:
		new_kw = {
			"id": kw.id,
			"word": kw.word
		}
		keyword_list.append(new_kw)


	context = {"keywords":keyword_list}
	return JsonResponse(context, safe=False)

def get_pori(request, pori_id):
	pori = get_object_or_404(PersonOrInstitute, pk=pori_id)

	context = {
		"id": pori.id,
		"name": pori.name,
		"culture": pori.culture,
		"dates": pori.dates,
		"description":pori.description,
		"historical_note":pori.historical_note,
		"isPerson":pori.isPerson,
		"cover_image": pori.cover_image.name,
		"address": pori.address,
		"contact": pori.contact
	}

	return JsonResponse(context, safe=False)

def get_by_keyword(request, keyword):
	#print(keyword)
	items = Item.objects.filter(keywords__word=keyword)
	#item_list = list(item_list.values())
	item_list = []
	for item in items:
		new_item = {
			'item': item.id,
			'cover_image': item.cover_image.name,
			'name': item.name,
			'description': item.description,
			'collection': item.collection.id,
			'culture_or_community': item.culture_or_community,
			'other_forms': item.other_forms,
			'digital_heritage_item':item.digital_heritage_item,
			'date_of_creation':item.date_of_creation,
			'physical_details':item.physical_details,
			'access_notes_or_rights_and_reproduction':item.access_notes_or_rights_and_reproduction,
			'catalog_number':item.catalog_number,
			'external_link':item.external_link,
			'provenance':item.provenance,
			'notes':item.notes,
			'citation':item.citation,
			'historical_note':item.historical_note,

			"keywords": [{"id":x.id,"name":str(x)} for x in list(item.keywords.all())],
			"creator": [{"id":x.id,"name":str(x)} for x in list(item.creator.all())],
			"place_created": [{"id":x.id,"name":str(x)} for x in list(item.place_created.all())],
			"location_of_originals": [{"id":x.id,"name":str(x)} for x in list(item.location_of_originals.all())]
		}
		item_list.append(new_item)


	context = {"items":item_list}
	return JsonResponse(context, safe=False)

def item_solo(request, item_id):
	#print(item_id)
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
	#stories = Story.objects.filter(item_id=item_id)
    #Display narratives
	narratives = Narrative.objects.filter(item_id=item_id)
    # Display images
	try :
		image = Image.objects.filter(item_id=item_id)
	except Image.DoesNotExist:
		image = None

	# TODO: Display videos
	try :
		video = Video.objects.filter(item_id=item_id)
	except Video.DoesNotExist:
		video = None
	
	vids = list()
	for v in list(video.values()):
		vids.append(v['link'])

	#print(  )

	context = {
    'item': item.id,
    'name': item.name,
	'cover_image': item.cover_image.name,
	'description': item.description,
	'collection': item.collection.id,
	'culture_or_community': item.culture_or_community,
	'other_forms': item.other_forms,
	'digital_heritage_item':item.digital_heritage_item,
	'date_of_creation':item.date_of_creation,
	'physical_details':item.physical_details,
	'access_notes_or_rights_and_reproduction':item.access_notes_or_rights_and_reproduction,
	'catalog_number':item.catalog_number,
	'external_link':item.external_link,
	'provenance':item.provenance,
	#'notes':item.notes,
	'citation':item.citation,
	'historical_note':item.historical_note,
	'place_create': item.place_created, 

	"keywords": [{"id":x.id,"name":str(x)} for x in list(item.keywords.all())],
	"creator": [{"id":x.id,"name":str(x)} for x in list(item.creator.all())],
	"location_of_originals": [{"id":x.id,"name":str(x)} for x in list(item.location_of_originals.all())],

    #'stories': list(stories.values()),
    'narratives': list(narratives.values()),
    'images': list(image.values()),
    'videos': vids
    }

	
	return JsonResponse(context, safe=False)

def item(request, collection_id, item_id):
	# Just reroute to solo item since this is a duplicate
	return item_solo(request, item_id)
	"""
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
    # Display videos
	try :
		videos = Video.objects.filter(item_id=item_id)
	except Video.DoesNotExist:
		video = None

	
	vids = list()
	for v in list(video.values()):
		vids.append(v['link'])
	#	print(item.value())
	

	context = {'item': item.id, 'name': item.name, 'description': item.description, 'collection_id': item.collection.id, 'stories': list(stories.values()), 'images': list(image.values()), 
	'videos' : vids, 'culture_or_community' : item.culture_or_community, 'heritage_type' : item.heritage_type, 'date_of_creation' : item.date_of_creation, 'creator_id' : item.creator.id,  
	'creator_description' : item.creator.name, 'physical_details' : item.physical_details, 'access_notes_or_rights_and_reproduction' : item.access_notes_or_rights_and_reproduction, 
        'place_created' : item.place_created, 'location_of_original' : item.location_of_original, 'historical_note' : item.historical_note,  'catalog_number' : item.catalog_number, 
        'external_link' : item.external_link, 'provenance' : item.provenance, 'keyword' : list(keyword.values()), 'cover_image' : item.cover_image}
	return JsonResponse(context, safe=False)

	# TODO: Temporarily commented out 'creator' field
	
	# context = {'item': item.id, 'name': item.name, 'description': item.description, 'collection_id': item.collection.id, 'stories': list(stories.values()), 'images': list(image.values()), 
	# 'videos' : vids, 'creator' : item.creator, 'culture_or_community' : item.culture_or_community, 'heritage_type' : item.heritage_type, 'date_of_creation' : item.date_of_creation, 
	# 'physical_details' : item.physical_details, 'reproduction_rights' : item.reproduction_rights, 'place_created' : item.place_created, 'source' : item.source, 
	# 'accession_number' : item.accession_number, 'accession_date' : item.accession_date, 'external_link' : item.external_link, 'provenance' : item.provenance, 'keyword' : list(keyword.values())}
	# return JsonResponse(context, safe=False)
	"""

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
