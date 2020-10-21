

import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;
  query;
  constructor(private route: ActivatedRoute, private api: ApiService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['data']
    });
    console.log("here");
    console.log(this.query);
    this.getItems(this.query);
    this.route.params.subscribe(params => {
      this.handleChange(params['data']);
    });
  }

  handleChange(data: string) {
    this.query = data;
    this.getItems(data);
  }

  getItems(query: string) {

    console.log("GETTING ITEMS FOR SEARCH");
    console.log(query);
    this.api.getItemByKeyword(query).subscribe((data) => {
      console.log(data);
      this.items = data["items"];
      console.log("FINISED GETTING ITEMS FOR SEARCH");
    });
  }
}

