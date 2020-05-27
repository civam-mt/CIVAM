import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-oral-histories',
  templateUrl: './oral-histories.component.html',
  styleUrls: ['./oral-histories.component.scss']
})
export class OralHistoriesComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getItems();
  }

  hasKeyword(item: object) {
    let keyword = "oral-history";

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
