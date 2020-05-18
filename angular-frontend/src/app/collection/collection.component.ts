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
  collectionItems; //Item list from collection (doesn't include all item atributes)
  // items = [];
  items;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getCollectionByCollectionID(params.get('collectionID'));
    });
  }

  getCollectionByCollectionID(collectionID: string) {
      this.api.getCollectionByCollectionID(collectionID).subscribe((data) => {
        this.collection = data;
        this.items = this.collection["item_list"];
    });
  }
}
