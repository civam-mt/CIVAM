from django.db import models
from django.contrib.auth.models import User
from constrainedfilefield.fields import ConstrainedFileField

# Create your models here.
class Collection(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="collections_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="collections_modified")
    modified_on = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="items")
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="items_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="items_modified")
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Media(models.Model):

    VALID_CONTENT = ["image/png", "image/jpeg",]
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="media")
    content = ConstrainedFileField(upload_to="uploaded/", content_types=VALID_CONTENT)

    def __str__(self):
        return self.item.name

class Story(models.Model):
    content = models.TextField()
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="stories")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stories_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stories_modified")
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "stories"

    def __str__(self):
        return self.item.name
    


    
