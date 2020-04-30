import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredCollections: Collection[] = DISTRICTS.slice(0, 3);
  /* TODO : Uncomment API Stuff*/
  API_URL = environment.apiUrl;
  tempCollections;
  collections;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getCollections();
  }
  getCollections() {
      this.api.getCollections().subscribe((data) => {
      this.tempCollections = data;
      this.collections = this.tempCollections.collection_list;
      console.log(this.collections);
    });
  }

}
