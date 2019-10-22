from django.forms import ModelForm
from civam.models import *

class StoryForm(ModelForm):
    class Meta:
        model = Story
        fields = ['content']