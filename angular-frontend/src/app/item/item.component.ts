import { Component, OnInit,Input, SecurityContext, ɵConsole } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router} from "@angular/router";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html', 
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() activeClass = 'active';
  SafePipe;


  API_URL = environment.apiUrl;
  item;
  images;
  rawVideos;
  videos;
  keywords;
  creators;
  originals;
  narratives;
  storiesCollapsed = true;
  narrativesCollapsed = true;
  showNavigationArrows = true;
  showNavigationIndicators = true;
  showModal: boolean = false; 
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
      this.narratives = this.item["narratives"];
      this.rawVideos = this.item["videos"];
      this.keywords = this.item["keywords"];
      this.keywords.sort((a, b) => (a.name > b.name) ? 1 : -1); // sort keywords alphabetically
      this.creators = this.item["creator"];
      this.originals = this.item["location_of_originals"];
      this.videos = this.rawVideos.map(function(video) {
        return "https://player.vimeo.com/video/".concat(video.slice(video.lastIndexOf('/') + 1));
        })
    });
  }
  toggleModal() {
    if (this.showModal) {
      this.showModal = false; 
      this.showNavigationArrows = true; 
      this.showNavigationIndicators = true; 
    } else {
      this.showModal = true; 
      this.showNavigationArrows = false; 
      this.showNavigationIndicators = false; 
    }
    console.log(this.showModal); 
    console.log(this.showNavigationIndicators); 
  }
  showHideModal() {
    let setClass = {
      "modalOff": !this.showModal,
    }
    return setClass; 
  }
}
