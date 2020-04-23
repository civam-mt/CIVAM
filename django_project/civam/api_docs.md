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
    "item_list" (list of Items): [
	...
    ]
}
```

Item:
```
{
    "id" (int): Item ID,
    "name" (str): Item name,
    "description" (str): Item description,
    "collection_id" (int),
    "created_by_id" (int),
    "created_on" (date),
    "modified_by_id" (int),
    "modified_on" (date)
}
```
___
