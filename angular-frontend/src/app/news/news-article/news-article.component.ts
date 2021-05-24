import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NewsSupportService } from 'src/app/services/news-support.service';
import { environment } from 'src/environments/environment';
import { NewsArticle } from 'src/model/NewsArticle';
import { Tile } from 'src/model/Tile';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  public localNewsArticle:NewsArticle;
  public newsArticleID:string;
  API_URL = environment.apiUrl;
  currentSubPage:string;
  currentPageUrl:string = '';
  allowedSubPage:string[] = ['item', 'attr', 'narr'];
  tiles: Tile[] = [
    {text: 'title', cols:15, rows:3, color:'lightgreen'},
    {text: '', cols:15, rows:1, color:'rgba(0, 0, 0, 0.1)'},
    {text: 'author', cols:9, rows:3, color:'#ffffff'},
    {text: 'published_on', cols:6, rows: 3, color: 'lightblue'},
    {text: 'cover_url', cols:6, rows:15, color:'lightgreen'},
    {text: '', cols:9, rows: 18, color: 'lightblue'},
    {text: 'tags.text', cols:6, rows:3, color: '#DDBDF1'},
  ];

  constructor(private newsSupport:NewsSupportService, 
      private route:ActivatedRoute) {
        this.newsSupport.localNewsArticle.subscribe((news:NewsArticle|null) => {
          this.localNewsArticle = news;
        });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.newsSupport.getNewsByID(params.get('newsArticleID'));
      this.newsArticleID = params.get('newsArticleID');
    });
    this.route.url.subscribe((url) => {
      this.currentPageUrl = '';
      url.forEach((urlComp) => {this.currentPageUrl = this.currentPageUrl + '/' + urlComp.path});
    });
    this.route.fragment.subscribe((fragment: string) => {
      if (this.allowedSubPage.includes(fragment)) this.currentSubPage = fragment;
      else this.currentSubPage = this.allowedSubPage[0];
      console.log(this.currentSubPage);
    }, (nonString:any) => {
      this.currentSubPage = this.allowedSubPage[0];
    });
  }

  getUrl():string {
    return this.API_URL + '/media/' + this.localNewsArticle.getElement('cover_url');
  }



}
