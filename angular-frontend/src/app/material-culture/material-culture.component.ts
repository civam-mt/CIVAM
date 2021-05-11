import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-material-culture',
  templateUrl: './material-culture.component.html',
  styleUrls: ['./material-culture.component.scss']
})
export class MaterialCultureComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;
  route = '/items';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getItems();
  }

  hasKeyword(item: object) {
    let keyword = "material-culture";

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
