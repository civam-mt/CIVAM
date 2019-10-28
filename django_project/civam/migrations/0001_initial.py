# Generated by Django 2.1.5 on 2019-10-28 15:00

import civam.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True)),
                ('cover_image', models.ImageField(null=True, upload_to='cover_images/')),
                ('public', models.BooleanField(default=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='collections_created', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='collections_modified', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.ImageField(upload_to=civam.models.image_upload_path)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='civam.Collection')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='items_created', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='items_modified', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stories_created', to=settings.AUTH_USER_MODEL)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stories', to='civam.Item')),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stories_modified', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'stories',
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='civam.Item')),
            ],
        ),
        migrations.AddField(
            model_name='image',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='civam.Item'),
        ),
    ]
