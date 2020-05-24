import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.scss']
})
export class ArtifactsComponent implements OnInit {
  collections: Collection[] = DISTRICTS;
  API_URL = environment.apiUrl;
  items;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getItems();
  }
  getItems() {
      this.api.getItems().subscribe((data) => {
        console.log(data);
        this.items = data["items"];
    });
  }

}
