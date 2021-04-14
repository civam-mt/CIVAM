##  3/15/2021	-	Mark Wolgin
##      - Removed summary field from Collections Model
##
##

from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, HttpResponseRedirect
from guardian.shortcuts import assign_perm, remove_perm, get_objects_for_user, get_objects_for_group
from guardian.decorators import permission_required
from django.contrib.postgres.search import TrigramSimilarity
from .models import *
from .models import Narrative
from .forms import *
import logging
from guardian.models import Group
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json
from profanityfilter import ProfanityFilter
from akismet import Akismet

AKISMET_API_KEY = "2be27375a975"

AKISMET_BLOG_URL = "http://localhost:4200/"
pf = ProfanityFilter()
# Civam views defined here

logger = logging.getLogger('my_app.views')


def index(request):
    return HttpResponse("index")


def collection_list(request):
    collection_list = Collection.objects.filter(public=True)
    # Uncomment line below filter out Colletions a user doesn't have permissions to view
    #collection_list = get_objects_for_user(request.user, 'civam.view_collection', collection_list, accept_global_perms=False)
    context = {'collection_list' : list(collection_list.values())}

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


@csrf_exempt 
def add_narrative(request):
	if request.method == "POST":
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		akismet_api = Akismet(key=AKISMET_API_KEY, blog_url=AKISMET_BLOG_URL)

		is_spam = akismet_api.comment_check(
            user_ip=request.META['REMOTE_ADDR'],
            user_agent=request.META['HTTP_USER_AGENT'],
            comment_type='contact-form',
            comment_author=body['author'],
            comment_content=body['narrative'],
        )
		if is_spam:
			return JsonResponse({'added_narrative': "false"}, safe=False)

		if pf.is_profane(body["narrative"]) or pf.is_profane(body["author"]):
			return JsonResponse({'added_narrative': "false"}, safe=False)
		item = get_object_or_404(Item, pk=body["itemID"])
		new_narrative = Narrative.objects.create(author=body["author"], 
												content=body["narrative"],
												item=item)
		return JsonResponse({'added_narrative': "true"}, safe=False)
	return JsonResponse({'added_narrative': "false"}, safe=False)

	
def search_keyword(request):
	keyword_list = []
	print("In search_keyword")
	query = request.GET.get('data', None)
	print(query)

	keywords = Keyword.objects.filter(word__istartswith=query)
	for keyword in keywords:
		keyword_list.append(keyword.word)
	return JsonResponse({'keywords': keyword_list}, safe=False)


def searchResult(request):
	query = request.GET.get('data', None)
	item_list = []
	#matches if query is contained in any keywords of Items
	matched_keywords = Keyword.objects.filter(word__iexact=query)
	#matches if query is contained in name of items
	matched_titles = Item.objects.filter(name__icontains=query)
	#matches if query is contained in description of items
	matched_desc = Item.objects.filter(description__icontains=query)
	#take union of sets
	items = Item.objects.filter(keywords__in= list(matched_keywords)).union(matched_titles, matched_desc).distinct()
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
			"location_of_originals": [{"id":x.id,"name":str(x)} for x in list(item.location_of_originals.all())]
		}
		item_list.append(new_item)
	context = {"items":item_list}
	return JsonResponse(context, safe=False)


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
    context = {
	'item_list': item_list, 
    'title': collection.title,
    'description': collection.description,
	'cover_image':collection.cover_image.name,
	'public':collection.public,
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
			"location_of_originals": [{"id":x.id,"name":str(x)} for x in list(item.location_of_originals.all())]
		}
		item_list.append(new_item)
	context = {"items":item_list}
	return JsonResponse(context, safe=False)


def all_pori(request):
	poris = PersonOrInstitute.objects.all()
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


def get_site_text(request, loc):
    st = SiteText.objects.filter(location__iexact=loc)[0]
    context = {
        "location" : st.location,
        "content"  : st.content
    }
    return JsonResponse(context, safe=False)


def get_by_keyword(request, keyword):
	if "@" in keyword:
		keyword = keyword.replace("@", "/")
	items = Item.objects.filter(keywords__word=keyword)
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
			"location_of_originals": [{"id":x.id,"name":str(x)} for x in list(item.location_of_originals.all())]
		}
		item_list.append(new_item)
	context = {"items":item_list}
	return JsonResponse(context, safe=False)


def item_solo(request, item_id):
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
    'narratives': list(narratives.values()),
    'images': list(image.values()),
    'videos': vids
    }
	return JsonResponse(context, safe=False)


def item(request, collection_id, item_id):
	# Just reroute to solo item since this is a duplicate
	return item_solo(request, item_id)
	
	
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

def get_news(request):
	return 0

def get_all_news_article(request):
	#rawlist = NewsArticle.objects.filter(publish_on <= timezone.now)
	rawlist = NewsArticle.objects.all()
	news_list = []
	for entry in rawlist:
		new_entry = {
			"article_id": entry.id,
			"title": entry.title,
			"cover": entry.cover_image.name,
			"content": entry.content,
			"published_on": entry.publish_on,
			"tags": [{"id":x.id,"name":str(x)} for x in list(entry.tags.all())],
			"author": entry.created_by.username
			}
		news_list.append(new_entry)
	##print(map_list)


	context = { "length": len(news_list) ,
		"articles": news_list}
	return JsonResponse(context, safe=False)

def get_news_article_by_tag(request):
	if (request.method == 'POST'):
		news_list = []
		body = json.loads(request.body)
		for tag in body['tags']:
			rawlist = NewsArticle.objects.filter(tags__word=tag)
			for entry in rawlist:
				contains = False
				for n in news_list:
					contains = n["article_id"] == entry.id or contains
				if not contains:
					new_entry = {
						"article_id": entry.id,
						"title": entry.title,
						"cover": entry.cover_image.name,
						"content": entry.content,
						"published_on": entry.publish_on,
						"tags": [{"id":x.id,"name":str(x)} for x in list(entry.tags.all())],
						"author": entry.created_by.username
						}
					news_list.append(new_entry)
		context = { "length": len(news_list) ,
			"articles": news_list}
		return JsonResponse(context, safe=False)
	else:
		return JsonResponse({"length": 0,
			"articles": []}, safe=False)

def get_news_article_by_id(request, article_id):
	article = get_object_or_404(NewsArticle, pk=article_id)
	news_list = [article]
	context = {	"articles": news_list}
	return JsonResponse(context, safe=False)