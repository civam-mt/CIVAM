import { Component, HostListener, OnInit,Input, SecurityContext, ɵConsole } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { environment } from '../../environments/environment';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { url } from 'inspector';
import {Track} from 'ngx-audio-player';

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
  
  public smallWindow:number = environment.windowSmall;
  
  public innerWidth:number;

  API_URL = environment.apiUrl;
  backgroundUrl;
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

  // Audio Player vars
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;
  msaapPlaylist;

  currentSubPage:string;
  currentPageUrl:string = '';
  allowedSubPage:string[] = ['attr', 'narr'];
  constructor(private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.route.url.subscribe((url) => {
      this.currentPageUrl = '';
      url.forEach((urlComp) => {this.currentPageUrl = this.currentPageUrl + '/' + urlComp.path});
    });
    this.route.paramMap.subscribe(params => {
      this.getItemByItemID(params.get('itemID'));
      this.itemID = params.get('itemID');
    });
    this.route.fragment.subscribe((fragment: string) => {
      if (this.allowedSubPage.includes(fragment)) this.currentSubPage = fragment;
      else this.currentSubPage = this.allowedSubPage[0];
      console.log(this.currentSubPage);
    }, (nonString:any) => {
      this.currentSubPage = this.allowedSubPage[0];
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
        this.backgroundUrl = result["cover_image"];
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
      this.msaapPlaylist = this.buildPlaylist(this.item.audio_tracks);
    });
  }

  /**
   * Builds a playlist for the audio player.
   * @param content audio track array from database object
   * @return ngx Track array
   */
  buildPlaylist(content:Array<any>) {
    const tracks: Track[] = [];
    content.forEach(e => {
      const track = new Track();
      track.title = this.getTrackName(e.content);
      track.link = this.API_URL + '/media/' + e.content;
      tracks.push(track);
    });
    return tracks;
  }

  /**
   * Extracts a filename (now called a track name) from a full
   * file path. Supports windows and unix file paths. Returns filename
   * AND extension, i.e. 'my_awesome_file.mp3'.
   * @param filename full path to file
   * @return only filename with extension
   */
  getTrackName(filename:string) {
    return filename.split('\\').pop().split('/').pop();
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

  angularLog(obj:any):void {
    console.log(obj);
  }

  applySelectedClass(str:string):string {
    if (str == this.currentSubPage) return 'nav-item-selected';
    else return '';
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  public produceLink(s:string):string {
    return "/search-result;data=" + s;
  }
}
