import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';

@Component({
  selector: 'app-oral-histories',
  templateUrl: './oral-histories.component.html',
  styleUrls: ['./oral-histories.component.scss']
})
export class OralHistoriesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
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
      console.log(data);
      this.items = data["items"];
      this.items = this.items.filter(this.hasKeyword);
    });
  }
}
