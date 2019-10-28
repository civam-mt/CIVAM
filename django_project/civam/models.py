from django.db import models
from django.contrib.auth.models import User, Group

# Create your models here.

# A collection of items
class Collection(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="cover_images/", blank=True)
    public = models.BooleanField(default=True)
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

def image_upload_path(instance, filename):
    return '{}/{}/{}'.format(instance.item.collection.id, instance.item.id, filename)

class Image(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="images")
    content = models.ImageField(upload_to=image_upload_path)

    def __str__(self):
        return "Image: {}".format(self.item.name)

class Video(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="videos")
    link = models.URLField()

    def __str__(self):
        return "Video: {}".format(self.item.name)

class Story(models.Model):
    content = models.TextField()
    author = models.CharField(max_length=255)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="stories")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stories_created")
    created_on = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stories_modified")
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "stories"

    def __str__(self):
        return "Story: {}".format(self.item.name)
