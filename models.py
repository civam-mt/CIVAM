from django.db import models



class Collection(models.Model):
    title = models.CharField(max_length=250)
    cover_item = models.ForeignKey(
        'Item',
        on_delete=models.CASCADE
    )
    groups = models.ManyToManyField(Group)
    created_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE
    )
    created_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE
    )
    modified_date = models.DateTimeField(auto_now=True)
    


class User(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=250)
    date_added = models.DateField(auto_now_add=True)
    groups = models.ManyToManyField(Group)
    created_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE
    )
    modified_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE
    )
    modified_date = models.DateTimeField(auto_now=True)