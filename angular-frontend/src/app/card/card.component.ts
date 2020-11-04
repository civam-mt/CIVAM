import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  tempCollections: Collection[] = DISTRICTS;

  API_URL = environment.apiUrl;
  collections;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCollections();
  }  
  getCollections() {
    this.api.getCollections().subscribe((data) => {
      console.log(data);
      this.collections = data["collection_list"];
  });
}

}
