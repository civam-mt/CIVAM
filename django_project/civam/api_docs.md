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
