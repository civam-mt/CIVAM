import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  tempCollection: Collection;
  API_URL = environment.apiUrl;
  collection;
  items;
  keywords;
  creators;
  originals;
  panelOpenState;
  itemKeywords;
  selectedKeywords;
  dropdownSettings: IDropdownSettings;
  router_route = '/items';

  constructor(private route: ActivatedRoute, private api: ApiService) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getCollectionByCollectionID(params.get('collectionID'), []);
    });

    this.selectedKeywords = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.panelOpenState = false;

  }

  getCollectionByCollectionID(collectionID: string, keywordIds: string[]) {
    this.api.getCollectionByCollectionID(collectionID, keywordIds).subscribe((data) => {
      this.collection = data;
      this.items = this.collection["item_list"];
      this.keywords = this.collection["keywords"];
      this.creators = this.collection["creator"];
      this.originals = this.collection["location_of_originals"];

      if (keywordIds = []) {
        this.itemKeywords = this.collection['unique_item_keywords']
      }
    });
  }

  onKeywordFilterSelect() {
    const keywordIds = this.selectedKeywords.map(keyword => keyword.id);
    this.getCollectionByCollectionID(this.route.snapshot.params.collectionID, keywordIds);
  }
}
