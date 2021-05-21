from django.forms import ModelForm
from django import forms
from civam.models import *
from guardian.models import Group
from django.core.exceptions import NON_FIELD_ERRORS
from django.utils.translation import gettext_lazy as _
from django_countries import countries
from django_countries.widgets import CountrySelectWidget

# Civam forms are defined here


class ExploreForm(ModelForm):
    class Meta:
        model = Explore
        fields = ['name', 'background_image']


class NarrativeForm(ModelForm):
    class Meta:
        model = Narrative
        fields = ['content', 'author']
        
class CollectionForm(ModelForm):
    class Meta:
        model = Collection
        fields = ['title', 'description', 'public']


class ItemForm(ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description', 'culture_or_community',
            'date_of_creation', 'physical_details', 'place_created',
            'location_of_originals', 'catalog_number', 'external_link', 'provenance']

        # TODO: commented out 'creator' field
        # FIXED
        # fields = ['name', 'description', 'creator', 'culture_or_community', 'heritage_type',
        #           'date_of_creation', 'physical_details', 'reproduction_rights', 'place_created',
        #           'source', 'accession_number', 'accession_date', 'external_link', 'provenance']

class PersonOrInstituteForm(ModelForm):
    class Meta:
        model = PersonOrInstitute
        fields = ['name'] 

class KeywordForm(ModelForm):
    class Meta:
        model = Keyword
        fields = ['word']

class NewsTagForm(ModelForm):
    class Meta:
        model = NewsTag
        fields = ['word']


class RegistrationForm(ModelForm):
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password']

    username = forms.CharField(label='Username', max_length=25)
    first_name = forms.CharField(label='First Name', max_length=35)
    last_name = forms.CharField(label='Last Name', max_length=35)
    email = forms.EmailField(label='Email')
    password = forms.CharField(label='Password', max_length=100, widget=forms.PasswordInput)

class ImageForm(forms.Form):
    content = forms.ImageField(required=False)

# Displayed on same page as ItemForm
class VideoForm(forms.Form):
    link = forms.URLField(required=False)

    
class CollectionGroupForm(ModelForm):
    class Meta:
        model = CollectionGroup
        fields = ['name', 'default', 'collection']
        widgets = {'collection': forms.HiddenInput()} # The collection is a hidden input that is automatically filled
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "A group with that name already exists for this collection.",
            }
        }

# The form for assigning permissions to a CollectionGroup
# Seperate form object but displayed on the same page as CollectionGroupForm
class GroupPermissionsForm(forms.Form):

    # List objects belonging the collection specified by collection_id
    def __init__(self,*args,**kwargs):
        collection_id = kwargs.pop('collection_id')
        super(GroupPermissionsForm,self).__init__(*args,**kwargs)
        self.fields['items'].queryset = Item.objects.filter(collection_id=collection_id)

    # Items in the collection can be checked/unchecked to grant/remove permission on that Item for the CollectionGroup
    items = forms.ModelMultipleChoiceField(queryset = Item.objects.none(), widget = forms.CheckboxSelectMultiple, required=False)

class MapDataForm(ModelForm):
    class Meta:
        model = MapData
        fields = ['name', 'lat', 'lng', 'url', 'contact_email', 'crow_material',
            'digital_collection', 'replied_to_contact', 'history', 'obj_photos',
            'street', 'city', 'province', 'country', 'continent', 'code', 'notes', 'cover_image']
        widgets = {'country': CountrySelectWidget()}

    name = forms.CharField(label="Institution Name", max_length=255)
    lat = forms.DecimalField(label="Latitude", max_digits=14, decimal_places=10)
    lng = forms.DecimalField(max_digits=14, decimal_places=10)
    url = forms.CharField(max_length=255)
    contact_email = forms.EmailField(max_length=254)
    crow_material = forms.BooleanField()
    digital_collection = forms.BooleanField()
    replied_to_contact = forms.BooleanField()
    history = forms.CharField(widget=forms.Textarea)
    obj_photos = forms.CharField(widget=forms.Textarea)
    street = forms.CharField(widget=forms.Textarea)
    city = forms.CharField(widget=forms.Textarea)
    province = forms.CharField(widget=forms.Textarea)
    country = CountryField().formfield(blank_label='(Select country)', default=dict(countries)['US'])
    continent = forms.CharField(widget=forms.Textarea)
    code = forms.CharField(widget=forms.Textarea)
    notes = forms.CharField(widget=forms.Textarea)
    cover_image = forms.ImageField()
    publish = forms.BooleanField()