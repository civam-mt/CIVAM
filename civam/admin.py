from django.contrib import admin
from .models import Collection, Item, Image, Video, Story
from guardian.admin import GuardedModelAdmin

# Register your models here
class DefaultAdmin(GuardedModelAdmin):
    readonly_fields = ('created_by', 'created_on', 'modified_by', 'modified_on')

    
    '''
    def has_change_permission(self, request, obj=None):
        if obj is not None and obj.created_by and not request.user.is_superuser and obj.created_by != request.user:
            return False
        return True
    '''
    def save_model(self, request, instance, form, change):
        user = request.user 
        instance = form.save(commit=False)
        if not change or not instance.created_by:
            instance.created_by = user
        instance.modified_by = user
        instance.save()
        form.save_m2m()
        return instance

class ItemInline(admin.TabularInline):
    model = Item
    exclude = ['created_by', 'created_on', 'modified_by', 'modified_on',]
    #can_delete = False

class ImageInline(admin.TabularInline):
    model = Image

class VideoInline(admin.TabularInline):
    model = Video

class CollectionAdmin(DefaultAdmin):
    list_display = ('title', 'created_by')
    inlines = [ItemInline,]

class ItemAdmin(DefaultAdmin):
    list_display = ('name', 'collection')
    inlines = [ImageInline, VideoInline]

class StoryAdmin(DefaultAdmin):
    list_display = ('item', 'created_by')


    
    
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Story, StoryAdmin)

    
