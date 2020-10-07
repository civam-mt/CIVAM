

import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getItems();
  }



  KeywordCheck(item: object) {
    console.log(item)
    let query:string = "game";
    console.log(query);
    let sum: number = 0;
    let keywords: string[] = [];
    for (var i in item["keywords"]) {
      keywords.push(item["keywords"][i]["name"]);
    }
    let queryBi: string[] = [];
      query = query.toLowerCase();
      for (let i = 0; i < query.length; i++){
        queryBi.push(query.slice(i, i + 2));
      }
    for (var keyword of keywords){
      //keyword = keyword.toLowerCase();
      let keywordBi: string[] = [];
      for (let i = 0; i < keyword.length; i++){
        keywordBi.push(keyword.slice(i, i + 2));
      }
      let union : number  = queryBi.length + keywordBi.length;
      let hit_count : number = 0;
      console.log(keywordBi);
      for (var x of queryBi) {
        for (var y of keywordBi) {
          if (x == y){
            hit_count += 1;
            console.log("A HIT!!");
          }
        }
      }
      sum += ((2.0 * hit_count) / union);
    }
    console.log(sum);
    return sum > .5;
  }

  getItems() {
    console.log("GETTING ITEMS!!");
    this.api.getItems().subscribe((data) => {
      this.items = data["items"];
      this.items = this.items.filter(this.KeywordCheck);
      console.log("FILTERED ITEMS!!");
    });
  }
}

