from django.forms import ModelForm
from django import forms
from civam.models import *

class StoryForm(ModelForm):
    class Meta:
        model = Story
        fields = ['content']
        
class CollectionForm(ModelForm):
    class Meta:
        model = Collection
        fields = ['title', 'description']


class ItemForm(ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description']

class ImageForm(forms.Form):
    content = forms.ImageField(required=False)
   
class VideoForm(forms.Form):
    link = forms.URLField(required=False)