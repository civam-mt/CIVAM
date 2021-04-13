from django.forms import ModelForm
from django import forms
from civam.models import *
from guardian.models import Group
from django.core.exceptions import NON_FIELD_ERRORS

# Civam forms are defined here
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
