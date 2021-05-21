import { Component, HostListener, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  tempCollections: Collection[] = DISTRICTS;
  public innerWidth:number;
  API_URL = environment.apiUrl;
  collections;
  route = '/collections';
  public smallWindow:number = environment.windowSmall;
  public siteText:string;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getCollections();
    this.innerWidth = window.innerWidth;
    this.getSiteTexts();
    
  }
  getCollections() {
      this.api.getCollections().subscribe((data) => {
        this.collections = data["collection_list"];
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  getSiteTexts() {
    this.api.getSiteTextByLocation('COL_MORE').subscribe((data) => {
      this.siteText = data["content"];
    });
  }

}
