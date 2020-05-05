import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
 

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']

})

export class ItemComponent implements OnInit {

  API_URL = environment.apiUrl;
  collections;
  items;
  item

  constructor(private api: ApiService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getCollections();
    //this.getItems();
  }
  getCollections() {
    this.api.getCollections().subscribe((data) => {
      console.log(data);
      this.collections = data["collection_list"];

      //This is not how this should be implemented, just tring to test the API calls/navigate to my singular test item
      this.collections.forEach((el) => {
        console.log(el);
        this.items = this.httpClient.get(`${this.API_URL}/api/collections/${el["id"]}/1`);
        
      });
      //So many forEach loops...
      this.items.forEach((anItem) => {
        this.item = anItem; 
        console.log(this.item);
      });
    });
  }

  //Doesn't recognize this.collections, so we are not using this currently
  getItems() {
    this.collections.forEach((el) => {
      console.log(el);
    });
  }

}
