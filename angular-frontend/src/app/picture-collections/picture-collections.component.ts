import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-picture-collections',
  templateUrl: './picture-collections.component.html',
  styleUrls: ['./picture-collections.component.scss']
})
export class PictureCollectionsComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getItems();
  }

  hasKeyword(item: object) {
    let keyword = "picture-collection";
    
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
