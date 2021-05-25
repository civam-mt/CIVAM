##  3/15/2021	-	Mark Wolgin
##      - Removed summary field from Collections Model
##
##  3/25/2021   -   Josh Davis
##      - Added SiteText Model
##
##  4/1/2021    -   Josh Davis
##      - Add additional site text location field options
##

from colorfield.fields import ColorField
from django.db import models
from django.contrib.auth.models import User, Group
from django_countries.fields import CountryField
from django.utils.translation import gettext_lazy as _
from django.db.models.functions import Lower


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
    related_collections = models.ManyToManyField('Collection', blank=True, related_name="related_people")

    private_notes = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="PorI_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="Pori_modified")

    modified_on = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = [Lower('name')]
        
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Person or Institution'

#Keyword Table
class Keyword(models.Model):
    word = models.CharField(max_length=255, unique=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="keyword_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="keyword_modified")
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = [Lower('word')]

    def __str__(self):
        return self.word

class NewsTag(models.Model):
    word = models.CharField(max_length=255, unique=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="news_article_tag_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="news_article_tag_modified")
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = [Lower('word')]

    def __str__(self):
        return self.word

# A Collection of items
# Each Collection has a title, description, cover_image, public (collection displayed on site if true)
class Collection(models.Model):

    font_family = (('Times New Roman', 'Times New Roman'), ('Arial', 'Arial'), 
    ('Verdana', 'Verdana'), ('Helvetica', 'Helvetica'), ('Tahoma', 'Tahoma'), 
    ('Trebuchet MS', 'Trebuchet MS'), ('Georgia', 'Georgia'), ('Garamond', 'Garamond'),
    ('Courier New', 'Courier New'), ('Brush Script MT', 'Brush Script MT'))

    title = models.CharField(max_length=255, unique=True)
    my_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    description = models.TextField(blank=True)
    dates = models.CharField(max_length=255, blank=True, null=True)
    cover_image = models.ImageField(upload_to="cover_images/", blank=True)
    public = models.BooleanField(default=True)
    #summary = models.TextField(blank=True, null=True)      ## Removed due to ticket S21D10-36
    provenance = models.TextField(blank=True, null=True)
    citation = models.TextField(blank=True, null=True)
    historical_note = models.TextField("Historical/Biographical Note", blank=True, null=True)
    access_notes_or_rights_and_reproduction = models.TextField(blank=True, null=True)
    geographical_location = models.CharField(max_length=511, null=True, blank=True)
    
    
    keywords = models.ManyToManyField(Keyword, blank=True, related_name="collection_keywords")
    creator = models.ManyToManyField(PersonOrInstitute, blank=True, related_name="collection_creators")
    location_of_originals = models.TextField(blank=True)


    background_image = models.ImageField(upload_to="background_images/collection/",blank=True)
    font_color =  ColorField(max_length=10, default='#000000')
    font_type = models.CharField(max_length=255,choices=font_family, blank=True)
    font_size = models.CharField(max_length=5, blank=True)


    private_notes = models.TextField(blank=True, null=True)
    private_cataloger = models.CharField(max_length=511, null=True, blank=True)
    private_catalog_date = models.DateTimeField(blank=True, null=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="collections_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="collections_modified")
    modified_on = models.DateTimeField(auto_now=True)

    class Meta(object):
        ordering = ['my_order']

    def __str__(self):
        return self.title


# An Item belongs to a Collection
# Each Item has a name and description (and the collection it belongs to) and alot more now
class Item(models.Model):
    name = models.CharField("Heritage Item",max_length=255)
    cover_image = models.ImageField(upload_to="cover_images/items/", blank=True)
    description = models.TextField(blank=True)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="items", blank=True)
    culture_or_community = models.CharField(max_length=127, null=True, blank=True)
    other_forms = models.TextField(blank=True, null=True)
    date_of_creation = models.CharField(max_length=127, null=True, blank=True)
    physical_details = models.TextField(blank=True, null=True)
    access_notes_or_rights_and_reproduction = models.TextField(blank=True, null=True)
    catalog_number = models.CharField(max_length=31, null=True, blank=True)
    external_link = models.URLField(max_length=200, null=True, blank=True)
    provenance = models.TextField(blank=True, null=True)
    private_notes = models.TextField(null=True, blank=True)
    citation = models.TextField(blank=True, null=True)   
    historical_note = models.TextField("Historical/Biographical Note", max_length=255, null=True, blank=True)
    place_created = models.CharField(max_length=511, null=True, blank=True)

    keywords = models.ManyToManyField(Keyword, blank=True, related_name="item_keywords")
    creator = models.ManyToManyField(PersonOrInstitute, blank=True, related_name="item_creators")
    location_of_originals = models.TextField(blank=True)

    changers = models.ManyToManyField(User, blank=True, related_name="changeable_items")

    is_cataloged = models.IntegerField(default=0, blank=True, null=True, help_text="1: Cataloged, 0: Uncataloged", choices=((1,"Cataloged"),(0,"Uncataloged")))
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

# The MapData class is used to allow easy insertion to the database a list of all map locations.
# Previously, this was stored in a google sheets document, but this allows easier access and more fedelity for the maps opperations
class MapData(models.Model):

    class ObjOrPhoto(models.TextChoices):
        OBJECT = 'OB', _('Objects')
        PHOTO = 'PH', _('Photos')
        BOTH = 'BO', _('Both')
        NONE = 'NA', _('None')

    class Continent(models.TextChoices):
        NA = 'NA', _('North America')
        SA = 'SA', _('South America')
        AF = 'AF', _('Africa')
        EU = 'EU', _('Europe')
        AS = 'AS', _('Asia')
        OS = 'OS', _('Oceania')
        AN = 'AN', _('Antartica')

    class SVGMapIcon(models.TextChoices):
        ARCH = 'ARCH', _('Archaeological')
        ARTS = 'ARTS', _('Art Gallery')
        ATTR = 'ATTR', _('Attraction')
        MONT = 'MONT', _('Monument')
        MUES = 'MUES', _('Museum')

    name = models.CharField("Instituition Name", max_length=255)
    lat = models.DecimalField("Latitude", max_digits=14, decimal_places=10)
    lng = models.DecimalField("Longitude", max_digits=14, decimal_places=10)
    url = models.CharField("Institution URL", max_length=255)
    cover_image = models.ImageField("Cover Image", upload_to="cover_images/articles/", blank=True, null=True)
    svg_choice = models.CharField(
        max_length=4,
        choices=SVGMapIcon.choices,
        default='MUES'
    )
    contact_email = models.EmailField("Contact Email", max_length=254, blank=True)
    crow_material = models.BooleanField("Do they have Crow Material?")
    digital_collection = models.BooleanField("Do they have a Digital Collection?")
    replied_to_contact = models.BooleanField("Have they replied to our contact?")
    history = models.TextField("Relevant History", blank=True)
    obj_photos = models.CharField(
        max_length=2,
        choices=ObjOrPhoto.choices,
        default='NA',
    )
    street = models.TextField(null=True, blank=True)
    city = models.TextField(null=True, blank=True)
    province = models.TextField("Province/State", null=True, blank=True)
    country = CountryField(null=True)
    continent = models.CharField(null=True,
        max_length=2,
        choices=Continent.choices,
        default = 'NA'
    )
    code = models.TextField("ZIP Code")
    notes = models.TextField()

    publish = models.BooleanField("Publish on Site", default=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="mapdata_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="mapdata_modified")
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} - {},{}\n'.format(self.name, 
            self.province, 
            self.country)
    
    class Meta:
        ordering = ['name']
        
class SiteText(models.Model):
    DATA_LOCATIONS = [
        ('ABOUT','About Headline'),
        ('MISSION','About: Our Mission'),
        ('ORIGINS','About: Origins'),
        ('PEOPLE1','About: People: Bio 1'),
        ('PEOPLE2','About: People: Bio 2'),
        ('PEOPLE3','About: People: Bio 3'),
        ('PEOPLE4','About: People: Bio 4'),
        ('CONTACT','About: Resources & Contact Information'),
        ('MAP_CON', 'Map: Context for the Map, and How to use it'),
        ('HOME_MAP', 'Home: Simple context about the map'),
        ('HOME_COL', 'Home: Simple context about the collections'),
        ('HOME_EXP', 'Home: Simple context about the explore page'),
        ('COL_MORE', 'Collections: Note that more collections will be added'),
        ('NEWSCON', 'News: Context about the news page')
    ]
    content = models.TextField()
    location = models.CharField('Location of text on site', max_length=8, choices=DATA_LOCATIONS, default='ABOUT', unique=True)

    def __str__(self):
        return self.location

class NewsArticle(models.Model):
    title = models.CharField("Article Title", max_length=255)
    cover_image = models.ImageField("Cover Image", upload_to="cover_images/articles/", blank=True)
    publish_on = models.DateTimeField("When to publish the article")
    content = models.TextField("Article Text")
    tags = models.ManyToManyField(NewsTag, blank=True, related_name="news_article_tag")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="news_article_created", default=1)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="news_article_modified", default=1)
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}\n'.format(self.title)
    
    class Meta:
        ordering = ['publish_on']


class Explore(models.Model):
    name = models.CharField("Name", max_length=255)
    background_image = models.ImageField("Background Image", upload_to="background_images/explore/", blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="explore_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="explore_modified")
    modified_on = models.DateTimeField(auto_now=True)

