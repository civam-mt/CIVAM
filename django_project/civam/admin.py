from django.contrib import admin
from .models import Collection, Item, Image, Video, Keyword, PersonOrInstitute, Narrative, SiteText, NewsArticle, NewsTag, MapData, Explore
from guardian.admin import GuardedModelAdmin
from adminsortable2.admin import SortableAdminMixin

# Civam admin models are defined here
# The admin module has capabilities to created/edit/view/delete Collections, Items, Images, Videos, and Stories


# A default admin model used for models with created_by, created_on, modified_by, and modified_on fields
class DefaultAdmin(GuardedModelAdmin):
    readonly_fields = ('created_by', 'created_on', 'modified_by', 'modified_on')


    
    # User have permission to change objects that they own
    def has_change_permission(self, request, obj=None):
        if obj is None:
            return True
        if not obj.created_by:
            return True
        if request.user.is_superuser:
            return True
        if obj.created_by == request.user:
            return True
        #if obj.changes.contains(request.user):
        #if request.user in obj.changers:
        if Item.objects.get(name=obj.name) in request.user.changeable_items.all():
            return True
        return False
        # if obj is not None and obj.created_by and not request.user.is_superuser and obj.created_by != request.user:
        #     return False
        # return True
    

    # Sets created_by and modified_by fields
    def save_model(self, request, instance, form, change):
        user = request.user 
        instance = form.save(commit=False)
        if not change or not instance.created_by:
            instance.created_by = user
        instance.modified_by = user
        instance.save()
        form.save_m2m()
        return instance

# Items can be created within a Collection
class ItemInline(admin.TabularInline):
    model = Item
    exclude = ['created_by', 'created_on', 'modified_by', 'modified_on',]
    #can_delete = False

# Images, Videos, and Stories can only be created within an Item
class ImageInline(admin.TabularInline):
    model = Image

class VideoInline(admin.TabularInline):
    model = Video

class NarrativeInline(admin.TabularInline):
    model = Narrative
    exclude = ['created_by', 'created_on', 'modified_by', 'modified_on',]

class PorIInline(admin.TabularInline):
    model = PersonOrInstitute.related_collections.through
    verbose_name = "Related person"
    verbose_name_plural = "Related people"

# Can create Collections and Items and Poris directly
class CollectionAdmin(SortableAdminMixin, DefaultAdmin):
    list_display = ('title', 'created_by')
    search_fields = ['title','creator__name','keywords__word']
    inlines = [PorIInline]

class ItemAdmin(DefaultAdmin):
    list_display = ('name', 'collection', 'cataloged')
    inlines = [ImageInline, VideoInline, NarrativeInline]
    search_fields = ['name','collection__title','culture_or_community','creator__name','date_of_creation','place_created','catalog_number','keywords__word']

    def cataloged(self, obj):
        return obj.is_cataloged == 1

    cataloged.boolean = True
    cataloged.admin_order_field = '-is_cataloged'
    cataloged.short_description = 'Is Cataloged?'

class PorIAdmin(DefaultAdmin):
    search_fields = ['name']

class KeywordAdmin(DefaultAdmin):
    search_fields = ['word']

class NewsTagAdmin(DefaultAdmin):
    search_fields = ['word']

class NewsArticleAdmin(DefaultAdmin):
    model = NewsArticle
class MapDataAdmin(DefaultAdmin):
    model = MapData

class ExploreAdmin(DefaultAdmin):
    model = Explore
    list_display = ('name', 'background_image')

# Register admin models    
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(PersonOrInstitute, PorIAdmin)
admin.site.register(Keyword, KeywordAdmin)
admin.site.register(NewsTag, NewsTagAdmin)
admin.site.register(MapData, MapDataAdmin)
admin.site.register(SiteText)
admin.site.register(NewsArticle, NewsArticleAdmin)
admin.site.register(Explore, ExploreAdmin)