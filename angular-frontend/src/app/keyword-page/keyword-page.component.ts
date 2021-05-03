import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-keyword-page',
  templateUrl: './keyword-page.component.html',
  styleUrls: ['./keyword-page.component.scss']
})
export class KeywordPageComponent implements OnInit {
  API_URL = environment.apiUrl;
  items;
  keyword;
  router_route = "/items"
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.keyword = params['keyword'];
    });
    this.getItems();
  }
  getItems() {
    let keyword_temp: string;
    if (this.keyword.includes("/")){
      keyword_temp= this.keyword.replace("/", "@");
    }
    else{
      keyword_temp = this.keyword;
    }
    this.api.getItemByKeyword(keyword_temp).subscribe((data) => {
      this.items = data["items"];
    });

  }

}
