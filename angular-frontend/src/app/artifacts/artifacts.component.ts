import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.scss']
})
export class ArtifactsComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getItems();
  }

  hasKeyword(item: object) {
    let keyword = "artifact";

    let keywords = [];
    for (var i in item["keywords"]) {
      keywords.push(item["keywords"][i]["name"]);
    }
    
    return keywords.indexOf(keyword) > -1;
  }

  getItems() {
    this.api.getItems().subscribe((data) => {
      this.items = data["items"];
      this.items = this.items.filter(this.hasKeyword);
    });
  }
}
