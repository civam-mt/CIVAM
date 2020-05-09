import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  tempCollection: Collection;
  API_URL = environment.apiUrl;
  collection;
  collectionItems; //Item list from collection (doesn't include images)
  items = [];

  constructor(private route: ActivatedRoute, private api: ApiService) {
    // TODO: Find collection by id from url
    this.tempCollection = DISTRICTS[0];
  }

    // TODO: change getting items to ng in HTML
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getCollectionByCollectionID(params.get('collectionID'));
    });
  }

  getCollectionByCollectionID(collectionID: string) {
      this.api.getCollectionByCollectionID(collectionID).subscribe((data) => {
        this.collection = data;
        this.collectionItems = this.collection["item_list"];
        console.log(this.collectionItems);

        for (let colItem of this.collectionItems) {
          console.log("Beginning of FOR loop");
          this.api.getItemByCollectionIDItemID(colItem.collection_id, colItem.id).subscribe((data) => {
            this.items.push(data);
          });
          console.log("End of FOR loop");
        }

        console.log(this.items);
        console.log('After this.items console log');
    });
  }

  // getItemByCollectionIDItemID(collectionID : string, itemID : string) {
  //   this.api.getItemByCollectionIDItemID(collectionID, itemID).subscribe((data) => {
  //     console.log("Item API data return below")
  //     console.log(data);
  //     return data;
  //   });
  // }
}
