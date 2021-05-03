

import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
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
  router_route = '/items';
  constructor(private route: ActivatedRoute, private api: ApiService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['data']
    });
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
    this.api.getSearch(query).subscribe((data) => {
      this.items = data["items"];
    });
  }
}

