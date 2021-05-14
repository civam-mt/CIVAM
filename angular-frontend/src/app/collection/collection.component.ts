import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Collection } from '../collection';
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
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
  backgroundURL;
  dropdownSettings: IDropdownSettings;
  router_route = '/items';
  currentSubPage:string;
  currentPageUrl:string = '';
  allowedSubPage:string[] = ['coll', 'list', 'attr', 'back'];
  pageOfItems;
  pageSize;
  compact = false;

  constructor(private route: ActivatedRoute, private api: ApiService) {}


  ngOnInit() {
    this.pageSize = 9;
    this.route.url.subscribe((url) => {
      this.currentPageUrl = '';
      url.forEach((urlComp) => {this.currentPageUrl = this.currentPageUrl + '/' + urlComp.path});
    });
    this.route.paramMap.subscribe(params => {
      this.getCollectionByCollectionID(params.get('collectionID'), []);
    });

    this.route.fragment.subscribe((fragment: string) => {
      if (this.allowedSubPage.includes(fragment)) this.currentSubPage = fragment;
      else this.currentSubPage = this.allowedSubPage[0];
    }, (nonString:any) => {
      this.currentSubPage = this.allowedSubPage[0];
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
      this.backgroundURL = this.collection["cover_image"];

      if (keywordIds = []) {
        this.itemKeywords = this.collection['unique_item_keywords']
      }
    });
  }

  onKeywordFilterSelect(value) {
    this.getCollectionByCollectionID(this.route.snapshot.params.collectionID, value);
  }

  onChangePage(pageOfItems) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  makeCompact(){
    this.compact = !this.compact;
  }

  changePageSize(event){
    this.pageSize = event.value;
  }

 

}

