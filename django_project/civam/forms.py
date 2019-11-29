from django.forms import ModelForm
from django import forms
from civam.models import *
from guardian.models import Group
from django.core.exceptions import NON_FIELD_ERRORS

class StoryForm(ModelForm):
    class Meta:
        model = Story
        fields = ['content', 'author']
        
class CollectionForm(ModelForm):
    class Meta:
        model = Collection
        fields = ['title', 'description', 'public']


class ItemForm(ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description']

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
   
class VideoForm(forms.Form):
    link = forms.URLField(required=False)

class CollectionGroupForm(ModelForm):
    class Meta:
        model = CollectionGroup
        fields = ['name', 'default', 'collection']
        widgets = {'collection': forms.HiddenInput()}
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "A group with that name already exists for this collection.",
            }
        }


class GroupPermissionsForm(forms.Form):
    def __init__(self,*args,**kwargs):
        collection_id = kwargs.pop('collection_id')
        super(GroupPermissionsForm,self).__init__(*args,**kwargs)
        self.fields['items'].queryset = Item.objects.filter(collection_id=collection_id)
    
    items = forms.ModelMultipleChoiceField(queryset = Item.objects.none(), widget = forms.CheckboxSelectMultiple, required=False)
