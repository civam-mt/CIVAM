import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;
  route='/items'
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getItems();
  }

  hasKeyword(item: object) {
    let keyword = "image";
    
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
