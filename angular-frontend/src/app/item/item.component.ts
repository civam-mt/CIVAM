import { Component, OnInit,Input, SecurityContext, ɵConsole } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// 3/25/21  - Tim Mazzarelli  - Added api call to get item's collection name

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html', 
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() activeClass = 'active';
  SafePipe;

  narrativeForm: FormGroup;
  submitted = false;
  error: string;
  loading = false;

  API_URL = environment.apiUrl;
  item;
  itemID;
  images;
  rawVideos;
  videos;
  keywords;
  creators;
  narratives;
  collection;
  storiesCollapsed = true;
  narrativesCollapsed = true;
  showNavigationArrows = true;
  showNavigationIndicators = true;
  showModal: boolean = false; 
  constructor(private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getItemByItemID(params.get('itemID'));
      this.itemID = params.get('itemID');
    });
    this.narrativeForm = this.formBuilder.group({
      author: ['', Validators.required],
      narrative: ['', Validators.required]
    });

  }

  getItemByItemID(itemID: string) {
    this.api.getItemByItemID(itemID).subscribe((data) => {
      this.item = data;
      this.api.getCollectionByCollectionID(this.item["collection"], []).subscribe((result) =>{
        this.collection = result["title"];
      });
      this.images = this.item["images"];
      this.narratives = this.item["narratives"];
      this.rawVideos = this.item["videos"];
      this.keywords = this.item["keywords"];
      this.keywords.sort((a, b) => (a.name > b.name) ? 1 : -1); // sort keywords alphabetically
      this.creators = this.item["creator"];
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
  }
  showHideModal() {
    let setClass = {
      "modalOff": !this.showModal,
    }
    return setClass; 
  }
  submitNarrative(){
    let message = this.narrativeForm.value
    message.itemID = this.itemID;
    this.api.addNarratives(message).subscribe(res => {
      if (res["added_narrative"] == "true"){
        this.getItemByItemID(this.itemID);
      }
      else{
        alert("Invalid narrative");
      }
    });
  }
}
