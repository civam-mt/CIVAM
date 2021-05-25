from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, HttpResponseRedirect
from guardian.shortcuts import assign_perm, remove_perm, get_objects_for_user, get_objects_for_group
from guardian.decorators import permission_required
from .models import *
from .forms import *
import logging
from guardian.models import Group

# Civam views defined here

# TODO, add forms/views for editing/deleting Items, Collections, Stories, Images, Videos, and CollectionGroups
logger = logging.getLogger(__name__)

def index(request):
    return HttpResponse("index")

# Lists public Collections
def collection_list(request):
    collection_list = Collection.objects.filter(public=True)
    # Uncomment line below filter out Colletions a user doesn't have permissions to view
    # collection_list = get_objects_for_user(request.user, 'civam.view_collection', collection_list, accept_global_perms=False)
    context = {'collection_list' : collection_list}
    return render(request, 'civam/collection_list.html', context)


def searchResult(request):
    logger.warn(request.GET.get('data', None))



# Register a new user
def register(request):
    form = RegistrationForm(request.POST or None)
    if(request.method == 'POST'):
        if form.is_valid():
            col_instance = form.save(commit=False)
            col_instance.created_by = request.user
            col_instance.modified_by = request.user
            col_instance.save()
            return redirect("/")

    context = {'registration_form': form}
    return render(request, 'civam/register.html', context)

# Create a new collection
@permission_required('civam.add_collection', return_403=True)
def new_collection(request):
    #print(request.POST)
    form = CollectionForm(request.POST or None)
    if(request.method == 'POST'):
        print(request.POST)
        if form.is_valid():
            col_instance = form.save(commit=False)
            col_instance.created_by = request.user
            col_instance.modified_by = request.user
            col_instance.save()
            return redirect("collection", collection_id = col_instance.id)

    context = {'collection_form': form}
    return render(request, 'civam/new_collection.html', context)

# View an item
@permission_required('civam.view_item', (Item, 'id', 'item_id'), return_403=True)
def item(request, collection_id, item_id):
    item = get_object_or_404(Item, pk=item_id)

    # Submitting a story
    if(request.method == 'POST'):
        form = StoryForm(request.POST)
        if form.is_valid():
            story_instance = form.save(commit=False)
            story_instance.item = item 
            story_instance.created_by = request.user
            story_instance.modified_by = request.user
            story_instance.save()
            return HttpResponseRedirect("")

    # Display stories
    stories = Story.objects.filter(item_id=item_id)

    # Display images
    try :
        image = Image.objects.filter(item_id=item_id)
    except Image.DoesNotExist:
        image = None

    # TODO: Display videos

    # StoryForm with author auto filled to User's name
    form = StoryForm(initial={'author':request.user.get_full_name})
    context = {'item': item, 'stories': stories, 'form': form, 'images': image}
    return render(request, 'civam/item.html', context)

# Create a new item in a collection
@permission_required('civam.add_item', return_403=True)
def new_item(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    if(request.method== 'POST'):
        item_form = ItemForm(request.POST, prefix='item')
        video_form = VideoForm(request.POST, prefix='video')
        if item_form.is_valid():
            item_instance = item_form.save(commit=False)
            item_instance.collection = collection
            item_instance.created_by = request.user
            item_instance.modified_by = request.user
            item_instance.save()
            for image in request.FILES.getlist('images'):
                image_instance = Image(item=item_instance,content=image)
                image_instance.save()
            if video_form.is_valid():
                link = video_form.cleaned_data['link']
                video_instance = Video(link=link, item=item_instance)
                video_instance.save()
            return redirect("collection", collection_id=collection_id)
    #regular GET
    item_form = ItemForm(prefix = 'item')
    image_form = ImageForm(prefix = 'image')
    video_form = VideoForm(prefix = 'video')
    context = {'item_form': item_form, 'image_form': image_form, 'video_form': video_form, 'collection': collection}
    return render(request, 'civam/new_item.html', context)


# Display list of Items in a Collection
# Uncomment line below to only show Collection if the User has permission to
# @permission_required('civam.view_collection', (Collection, 'id', 'collection_id'), return_403=True)
def collection(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    item_list = Item.objects.filter(collection=collection)
    item_list = get_objects_for_user(request.user, 'civam.view_item', item_list, accept_global_perms=False)
    context = {'item_list': item_list, 'collection': collection}
    return render(request, 'civam/collection.html', context)

# Create a new CollectionGroup, specifying viewing permissions the group has on Items in a Collection
@permission_required('civam.add_collectiongroup', return_403=True)
def new_group(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    print(collection_id)
    group_form = CollectionGroupForm(request.POST or None, initial={'collection':collection}, prefix="group")
    perm_form = GroupPermissionsForm(request.POST or None, prefix="perms", collection_id=collection_id)
    if(request.method == 'POST'):
        group_valid = group_form.is_valid()
        perm_valid = perm_form.is_valid()
        if group_valid and perm_valid:
            col_group = group_form.save(commit=False)
            group = Group(name="c{}_{}".format(collection_id, col_group.name)) # Create a new Django Auth Group with collection_id prefix
            group.save()
            col_group.group = group
            col_group.save()
            items = perm_form.cleaned_data['items']
            assign_perm("civam.view_item", group, items) # assign viewing permission for the Group on selected Items
            return redirect("groups", collection_id=collection_id)

    context = {'group_form': group_form, 'perm_form': perm_form, 'collection': collection}
    return render(request, 'civam/new_group.html', context)

# Edit a CollectionGroup, specifying viewing permissions the group has on Items in a Collection
@permission_required('civam.change_collectiongroup', return_403=True)
def group(request, collection_id, group_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    col_group = get_object_or_404(CollectionGroup, pk=group_id)
    group = col_group.group
    group_form = CollectionGroupForm(request.POST or None, instance=col_group, initial={'collection':collection}, prefix="group")
    old_items = get_objects_for_group(col_group.group, "civam.view_item")
    perm_form = GroupPermissionsForm(request.POST or None, prefix="perms", collection_id=collection_id, initial={"items": old_items})
    if(request.method == 'POST'):
        group_valid = group_form.is_valid()
        perm_valid = perm_form.is_valid()
        if group_valid and perm_valid:
            group_form.save()
            group.name = "c{}_{}".format(collection_id, col_group.name) # Change Django Auth Group name
            group.save()
            new_items = perm_form.cleaned_data['items']
            #print("assign", new_items.difference(old_items))
            #print("remove", old_items.difference(new_items))

            # Newly checked items to assign viewing permissions to
            assign = new_items.difference(old_items)
            if assign: assign_perm("civam.view_item", group, assign)

            # Newly unchecked ites to remove viewing permission from
            remove = old_items.difference(new_items)
            if remove: remove_perm("civam.view_item", group, remove)
            #print(get_objects_for_group(group, "civam.view_item"))
            return redirect("groups", collection_id=collection_id)

    context = {'collection': collection, 'group': col_group, 'group_form': group_form, 'perm_form': perm_form}
    return render(request, 'civam/group.html', context)

# Display CollectionGroups
@permission_required('civam.view_collectiongroup', return_403=True)
def group_list(request, collection_id):
    collection = get_object_or_404(Collection, pk=collection_id)
    group_list = CollectionGroup.objects.filter(collection=collection)
    context = {'group_list': group_list, 'collection': collection}
    return render(request, 'civam/groups.html', context)


#ADD MAPDATA
@permission_required('civam.add_mapdata', return_403=True)
def new_mapdata(request):
    form = MapDataForm(request.POST or None)
    if(request.method == 'POST'):
        print(request.POST)
        if form.is_valid():
            col_instance = form.save(commit=False)
            col_instance.created_by = request.user
            col_instance.modified_by = request.user
            col_instance.save()
            return redirect("mapdata", mapdata_id = col_instance.id)
    context = {'mapdata_form': form}
    return render(request, 'civam/new_mapdata.html', context)

@permission_required('civam.mapdata', return_403=True)
def mapdata(request):
    mapdata = get_object_or_404(MapData)
    context = {'map_list': mapdata}
    return render(request, 'civam/mapdata')


def get_mapdata_by_id(request, mapdata_id):
    return render(request, 'civam/get_mapdata_by_id')

#Add Explore
@permission_required('civam.add_explore', return_403=True)
def new_explore(request):
    form = Explore(request.POST or None)
    if (request.method == 'POST'):
        print(request.POST)
        if form.is_valid():
            col_instance = form.save(commit = False)
            col_instance.created_by = request.user
            col_instance.modified_by = request.user
            col_instance.save
            return redirect("explore", explore_id = col_instance.id)
    context = {'explore_form': form}
    return render(request, 'civam/new_explore.html', context)

@permission_required('civam.explore', return_403=True)
def explore(request):
    expl = get_object_or_404(Explore)
    context = {'explore_list': expl}
    return render(request, 'civam/explore')


#ADD News Article
@permission_required('civam.add_mapdata', return_403=True)
def new_news_article(request):
    form = NewsArticle(request.POST or None)
    if(request.method == 'POST'):
        print(request.POST)
        if form.is_valid():
            col_instance = form.save(commit=False)
            col_instance.created_by = request.user
            col_instance.modified_by = request.user
            col_instance.save()
            return redirect("news_article", mapdata_id = col_instance.id)
    context = {'news_article_form': form}
    return render(request, 'civam/new_news_article.html', context)

@permission_required('civam.news_article', return_403=True)
def news_article(request):
    article = get_object_or_404(NewsArticle)
    context = {'news_article_list': article}
    return render(request, 'civam/news_article')

@permission_required('civam.news_article', return_403=True)
def get_news_article_by_id(request, article_id):
    return render(request, 'civam/get_news_article_by_id')


#ADD News Tag
@permission_required('civam.add_newstag', return_403=True)
def new_news_tag(request):
    form = NewsArticle(request.POST or None)
    if(request.method == 'POST'):
        print(request.POST)
        if form.is_valid():
            col_instance = form.save(commit=False)
            col_instance.created_by = request.user
            col_instance.modified_by = request.user
            col_instance.save()
            return redirect("newstag", mapdata_id = col_instance.id)
    context = {'newstag_form': form}
    return render(request, 'civam/new_newstag.html', context)

@permission_required('civam.newstag', return_403=True)
def news_tag(request):
    article = get_object_or_404(NewsArticle)
    context = {'newstag_list': article}
    return render(request, 'civam/newstag')

@permission_required('civam.newstag', return_403=True)
def get_news_tag_by_id(request, article_id):
    return render(request, 'civam/get_newstag_by_id')