import { Component, OnInit, SecurityContext } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
 


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html', 
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  SafePipe;
  API_URL = environment.apiUrl;
  item;
  images;
  stories;
  videos;
  public storiesCollapsed = true;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getItemByItemID(params.get('itemID'));
    });
  }
  getItemByItemID(itemID: string) {
    this.api.getItemByItemID(itemID).subscribe((data) => {
      console.log(data)
      this.item = data;
      this.images = this.item["images"];
      this.stories = this.item["stories"];
      this.videos = this.item["videos"];

    });
  }
}