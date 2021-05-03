import { Component, HostListener, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import { verifyHostBindings } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public siteTexts = {};
  public siteTextIDs:string[] = ['HOME_MAP', 'HOME_COL'];
  public loaded_context:boolean;

  innerWidth:number;
  smallWindow:number = environment.windowSmall;
  showNavigationArrows = true;
  showNavigationIndicators = true;

  featuredCollections: Collection[] = DISTRICTS.slice(0, 3);
  /* TODO : Uncomment API Stuff*/
  API_URL = environment.apiUrl;
  collections;

  constructor(private api: ApiService) { }

  private getTime(date?: Date){
    return date != null ? date.getTime(): 0;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.loaded_context = false;
    this.getSiteTexts()
    this.getCollections();
  }
  getCollections() {
      this.api.getCollections().subscribe((data) => {
        this.collections = data["collection_list"].sort((a, b) => {
          return (new Date(a.modified_on).getTime() < new Date(b.modified_on).getTime());
        });
    });
  }
  getSiteTexts() {
    for (var i = 0; i < this.siteTextIDs.length; i++) {
      this.api.getSiteTextByLocation(this.siteTextIDs[i]).subscribe((data) => {
        this.siteTexts[data["location"]] = data["content"];
      });
    }
  }
  mouseOver() {
    let cbs = Array.from(document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>)
    for (var i = 0; i < cbs.length; i++) {
      cbs[i].style.opacity = "1"; 
    }
  }
  mouseOut() {
    let cbs = Array.from(document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>)
    for (var i = 0; i < cbs.length; i++) {
      cbs[i].style.opacity = "0"; 
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
}
