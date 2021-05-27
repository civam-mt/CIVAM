import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsSupportService } from 'src/app/services/news-support.service';
import { environment } from 'src/environments/environment';
import { NewsArticle } from 'src/model/NewsArticle';

@Component({
  selector: 'app-news-tag',
  templateUrl: './news-tag.component.html',
  styleUrls: ['./news-tag.component.scss']
})
export class NewsTagComponent implements OnInit {
  public allTagNews:NewsArticle[];
  public newsArticleID:string;
  API_URL = environment.apiUrl; 

  constructor(private newsSupport:NewsSupportService, private route:ActivatedRoute) {
    this.newsSupport.newsList.subscribe((news:Array<NewsArticle>|null) => {
      this.allTagNews = news;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.newsSupport.getNewsArticleByID(params.get('newsTagID'));
      this.newsArticleID = params.get('newsTagID');
    });
  }

}
