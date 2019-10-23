from django.forms import ModelForm
from django import forms
from civam.models import *

class StoryForm(ModelForm):
    class Meta:
        model = Story
        fields = ['content']

class ItemForm(ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description']

class ImageForm(forms.Form):
    content = forms.FileField(required=False)
   
class VideoForm(forms.Form):
    link = forms.URLField(required=False)