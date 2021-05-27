

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
  currentSubPage:string;
  currentPageUrl:string = '';
  allowedSubPage:string[] = ['gall', 'list'];
  pageSize;
  pageOfItems;
  constructor(private route: ActivatedRoute, private api: ApiService) {

  }

  ngOnInit(): void {
    this.pageSize = 9;
    this.route.params.subscribe(params => {
      this.query = params['data']
    });
    this.getItems(this.query);
    this.route.params.subscribe(params => {
      this.handleChange(params['data']);
    });
    this.route.url.subscribe((url) => {
      this.currentPageUrl = '';
      url.forEach((urlComp) => {this.currentPageUrl = this.currentPageUrl + '/' + urlComp.path + ";data=" + this.query});
    });
    this.route.fragment.subscribe((fragment: string) => {
      if (this.allowedSubPage.includes(fragment)) this.currentSubPage = fragment;
      else this.currentSubPage = this.allowedSubPage[0];
    }, (nonString:any) => {
      this.currentSubPage = this.allowedSubPage[0];
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

  onChangePage(pageOfItems) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  changePageSize(event){
    this.pageSize = event.value;
  }
}

