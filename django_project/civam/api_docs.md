# Api Docs
### Last Updated 5/25/20 by James Skripchuk
___
### /api/collection/

GET 

Gets the list of collection


```
Return Structure:

"collection_list": (List of Collection): [
    ...
]

```

Collection

```
{
    "id" (Int): Collection ID,
    "title" (String): Collection Title,
    "description" (String): Collection Description,
    "cover_image" (String): File path of cover image,
    "public" (Bool): Collection is viewable to the public,
    "modified_on" (Date):,
    "created_on" (Date):
}

```


___
### /api/collections/\<int:collection_id>/

GET

Represents a collection

```
Return Structure:
{
    "title" (str): Name of the collection,
    "description" (str): Collection description,
    "item_list" (list of ReducedItems): [
	...
    ]
}
```

___
__
### /api/collections/\<int:collection_id>/\<int:item_id>
### /api/collections/\<int:item_id>

GET

Gets an item from the database

```
Returns a FullItem (Below)
```

___
### /api/items/all

GET

Gets all items from the database

```
{
    "items" (List of ReducedItems)
}
```

___
### Reduced Item

ReducedItem:
```
{
    "id" (int): Item ID,
    "name" (str): Item name,
    "description" (str): Item description,
    "collection_id" (int),
    "culture_or_community" (str),
    "heritage_type" (str),
    "date_of_creation" (datetime),
    "physical_details" (str),
    "reproduction_rights" (str),
    "place_created" (str),
    "source" (str),
    "accession_number"(str),
    "accession_date" (datetime),
    "external_link" (str),
    "provenance" (str),
    "cover_image" (str): "Path to cover image"
}
```
___
### Full Item
An item object with all information relating to it

FullItem:
```
{
    "item" (int): Item ID,
    "name" (str): Item name,
    "description" (str): Item description,
    "collection_id" (int),
    "stories" (List of Stories),
    "images" (List of Images),
    "videos" (List of str): Links to videos,
    "culture_or_community" (str),
    "heritage_type" (str),
    "date_of_creation" (datetime),
    "physical_details" (str),
    "reproduction_rights" (str),
    "place_created" (str),
    "source" (str),
    "accession_number"(str),
    "accession_date" (datetime),
    "external_link" (str),
    "provenance" (str),
    "keyword" (List of str)
}
```
___
