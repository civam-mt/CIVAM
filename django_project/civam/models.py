from django.db import models
from django.contrib.auth.models import User, Group

# Civam models are defined here
# Some models have created_by, created_on, modified_by, and modified_on fields
# created_on and modied_on are set automatically

#PorI = Person or Institute
class PersonOrInstitute(models.Model):
    name = models.CharField(max_length=125, blank=True)
    culture = models.CharField(max_length=255, blank=True, null=True)
    dates = models.CharField(max_length=255, blank=True, null=True)

    description = models.TextField(blank=True, null=True)

    historical_note = models.TextField(blank=True, null=True)
    isPerson = models.BooleanField()
    cover_image = models.ImageField(upload_to="cover_images/pori/", blank=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    contact = models.CharField(max_length=255, blank=True, null=True)

    private_notes = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="PorI_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="Pori_modified")

    modified_on = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

#Keyword Table
class Keyword(models.Model):
    word = models.CharField(max_length=31, unique=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="keyword_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="keyword_modified")
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.word

# A Collection of items
# Each Collection has a title, description, cover_image, public (collection displayed on site if true)
class Collection(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    dates = models.CharField(max_length=255, blank=True, null=True)
    cover_image = models.ImageField(upload_to="cover_images/", blank=True)
    public = models.BooleanField(default=True)
    summary = models.TextField(blank=True, null=True)
    provenance = models.TextField(blank=True, null=True)
    citation = models.TextField(blank=True, null=True)
    historical_note = models.TextField(blank=True, null=True)
    access_notes_or_rights_and_reproduction = models.TextField(blank=True, null=True)
    geographical_location = models.CharField(max_length=511, null=True, blank=True)
    
    
    keywords = models.ManyToManyField(Keyword, blank=True, related_name="collection_keywords")
    creator = models.ManyToManyField(PersonOrInstitute, blank=True, related_name="collection_creators")
    location_of_originals = models.ManyToManyField(PersonOrInstitute, blank=True, related_name="collection_locations")

    private_notes = models.TextField(blank=True, null=True)
    private_cataloger = models.CharField(max_length=511, null=True, blank=True)
    private_catalog_date = models.DateTimeField(blank=True, null=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="collections_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="collections_modified")
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# An Item belongs to a Collection
# Each Item has a name and description (and the collection it belongs to) and alot more now
class Item(models.Model):
    name = models.CharField(max_length=255)
    cover_image = models.ImageField(upload_to="cover_images/items/", blank=True)
    description = models.TextField(blank=True)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="items", blank=True)
    culture_or_community = models.CharField(max_length=127, null=True, blank=True)
    other_forms = models.TextField(blank=True, null=True)
    digital_heritage_item = models.CharField(max_length=127, null=True, blank=True)
    date_of_creation = models.CharField(max_length=127, null=True, blank=True)
    physical_details = models.TextField(blank=True, null=True)
    access_notes_or_rights_and_reproduction = models.TextField(blank=True, null=True)
    catalog_number = models.CharField(max_length=31, null=True, blank=True)
    external_link = models.URLField(max_length=200, null=True, blank=True)
    provenance = models.TextField(blank=True, null=True)
    private_notes = models.TextField(null=True, blank=True)
    citation = models.TextField(blank=True, null=True)   
    historical_note = models.TextField(max_length=255, null=True, blank=True)
    place_created = models.CharField(max_length=511, null=True, blank=True)

    keywords = models.ManyToManyField(Keyword, blank=True, related_name="item_keywords")
    creator = models.ManyToManyField(PersonOrInstitute, blank=True, related_name="item_creators")
    location_of_originals = models.ManyToManyField(PersonOrInstitute, blank=True, related_name="item_locations")    

    private_cataloger = models.CharField(max_length=511, null=True, blank=True)
    private_catalog_date = models.DateTimeField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="items_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="items_modified")
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# Images are uploaded in a folder corresponding to the collection and item ids    
def image_upload_path(instance, filename):
    return '{}/{}/{}'.format(instance.item.collection.id, instance.item.id, filename)

# An Image of an Item
# content is the path to the image
# Has an item that it belongs to
class Image(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="images")
    content = models.ImageField(upload_to=image_upload_path)

    def __str__(self):
        return "Image: {}".format(self.item.name)

# A Video of an Item (link to external streaming service)
# Has an Item that it belongs to
class Video(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="videos")
    link = models.URLField()
    thumbnail = models.ImageField(upload_to="thumbnails/", blank=True)


    def __str__(self):
        return "Video: {}".format(self.item.name)


#Narrative, Used for each item. Kind of like a backend only story for now. 
class Narrative(models.Model):
    content = models.TextField()
    author = models.CharField(max_length=255)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="narratives")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="narratives_created", default=1)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="narrative_modified", default=1)
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "narratives"

    def __str__(self):
        return "Narrative: {}".format(self.item.name)

# Each CollectionGroup has a corresponding Group (Django Auth) and Collection
# Permissions on the Items in the Collection are defined for the Group
# Each CollectionGroup has a name that is unique within a given Collection
# If default is true, new users should automatically be added to this Group

# TO DO: If a CollectionGroup is deleted, the corresponding Group should be deleted
class CollectionGroup(models.Model):
    name = models.CharField(max_length=125)
    default = models.BooleanField(default=False)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="groups")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="collections")

    class Meta:
        # Cannot CollectionGroups with the same name defined on the same Collection
        unique_together = ('name', 'collection')
    
    def __str__(self):
        return "CollectionGroup: {} {}".format(self.collection.title, self.group.name)


