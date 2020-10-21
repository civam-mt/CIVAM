import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';
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
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.subscribe(params => {
      this.keyword = params['keyword'];
    });
    this.getItems();
  }
  getItems() {

    console.log("GETTING ITEMS FOR KEYWORD");
    console.log(this.keyword);
    this.api.getSearch(this.keyword).subscribe((data) => {
      console.log(data);
      this.items = data["items"];
      console.log("FINISED GETTING ITEMS FOR SEARCH");
    });

  }

}
