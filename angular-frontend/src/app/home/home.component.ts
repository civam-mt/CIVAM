import { Component, HostListener, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import { verifyHostBindings } from '@angular/compiler';
import { NewsArticle } from 'src/model/NewsArticle';
import { NewsSupportService } from '../services/news-support.service';
import { SiteTextSupportService } from '../services/site-text-support.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public collections;
  public collection:Collection;
  public innerWidth:number;
  public loaded_context:boolean;
  public newsList:Array<NewsArticle> = new Array<NewsArticle>();
  public smallWindow:number = environment.windowSmall;
  public showNavigationArrows = true;
  public showNavigationIndicators = true;
  public siteTexts = {};
  public siteTextIDs:string[] = ['HOME_MAP', 'HOME_COL'];




  featuredCollections: Collection[] = DISTRICTS.slice(0, 3);
  /* TODO : Uncomment API Stuff*/
  API_URL = environment.apiUrl;
  

  constructor(private api: ApiService, private newsSupport:NewsSupportService, private siteTextSupport:SiteTextSupportService) { }

  private getTime(date?: Date){
    return date != null ? date.getTime(): 0;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.loaded_context = false;
    this.getSiteTexts()
    this.getCollections();
    this.getNews();
  }
  getCollections() {
      this.api.getCollections().subscribe((data) => {
        this.collections = data["collection_list"].sort((a, b) => {
          return (new Date(a.modified_on).getTime() < new Date(b.modified_on).getTime());
        });
        this.collection = this.collections[0];
    });
  }
  getSiteTexts() {
    this.siteTextSupport.getManySiteText(this.siteTextIDs);
    this.siteTextSupport.loadedElements.subscribe((emitter) => {
      if (emitter) {
        var arr = this.siteTextSupport.loadManySiteText(this.siteTextIDs);
        for (var i = 0; i < arr.length; i ++ ) {
          this.siteTexts[arr[i][0]] = arr[i][1];
        }
      }
    });
  }
  
  getNews() {
    this.newsSupport.getAllNews();
    this.newsSupport.newsList.subscribe((nl) => {
      if (nl != null) {
        this.newsList = nl;
      }
    })
  }
  newsUrlWrapper(news:NewsArticle):string {
    return this.API_URL + '/media/' + news.getCoverURL();
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
