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
  tiles: Tile[] = [
    {text: 'title', cols:15, rows:1, color:'lightgreen'},
    {text: 'author', cols:9, rows:1, color:'#ffffff'},
    {text: 'published_on', cols:6, rows: 1, color: 'lightblue'},
    {text: 'cover_url', cols:6, rows:5, color:'lightgreen'},
    {text: 'content', cols:9, rows: 6, color: 'lightblue'},
    {text: 'tags.text', cols:6, rows:1, color: '#DDBDF1'},
  ];

  constructor(private newsService:NewsSupportService, 
      private route:ActivatedRoute, 
      private api:ApiService, 
      private formBuilder:FormBuilder) {
        this.newsService.localNewsArticle.subscribe((news:NewsArticle|null) => {
          this.localNewsArticle = news;
        });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.newsService.getNewsByID(params.get('newsArticleID'));
      this.newsArticleID = params.get('newsArticleID');
    });
    
  }



}
