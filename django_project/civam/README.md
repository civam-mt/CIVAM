# Civam Project Folder

## To-Dos:
* **models.py, Line 83** - If a CollectionGroup is deleted, the corresponding Group should be deleted
* **views.py, Line 11** - Add forms/views for editing/deleting Items, Collections, Stories, Images, Videos, and CollectionGroups
* **views.py, Line 78** - Display videos

## Folders:
* **\_\_pycache\_\_** - Cache of the folder's files
* **migrations** - Record of all the migrations that have been made
* **templates** - All the .html files that the make up the views

## Files:
* **\_\_init\_\_.py** - Empty file
* **admin.py** - Creates admin module, give admin users the permissions to create, change, and delete objects
* **apps.py** - Registers civam app in the django project
* **forms.py** - Creates forms for civam objects, which fields there are to fill in when create/changing objects
* **models.py** - Creates models in django for Collections, Items, Images, Videos, Stories, and Groups
* **tests.py** - Django tests
* **urls.py** - Defines which urls go to which views
* **views.py** - Creates the different available views, which templates they link to in the templates folder
