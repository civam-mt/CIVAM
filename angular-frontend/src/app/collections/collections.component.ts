import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  tempCollections: Collection[] = DISTRICTS;

  API_URL = environment.apiUrl;
  collections;
  route = '/collections';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getCollections();
  }
  getCollections() {
      this.api.getCollections().subscribe((data) => {
        this.collections = data["collection_list"];
    });
  }

}
