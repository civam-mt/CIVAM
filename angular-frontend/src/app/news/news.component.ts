import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NewsArticle } from 'src/model/NewsArticle';
import { NewsSupportService } from '../services/news-support.service';
import { NewsTile, Tile } from 'src/model/Tile';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  _newsList:Array<NewsArticle> = null;
  API_URL = environment.apiUrl;
  tiles: NewsTile[] = [
    {text: 'title', cols:3, rows:1, color:'', style: {'text-align':'left', 'border-bottom': '#c5c4c4 solid 1px'}},
    {text: 'author', cols:3, rows: 1, color: '', style: {'text-align':'right', 'border-bottom': '#c5c4c4 solid 1px'}},
    {text: 'cover_url', cols:2, rows:3, color:'', style: {'text-align':'right'}},
    {text: 'content.bounded', cols:4, rows: 3, color: '', style: {'text-align':'right'}},
    {text: 'published_on', cols:1, rows:1, color: '', style: {'text-align':'right'}},
    {text: 'tags.text', cols:5, rows:1, color: '', style: {'text-align':'right'}},
  ];

  constructor(private newsSupport:NewsSupportService) {
    newsSupport.newsList.subscribe(newsList => {
      if (newsList != null) {
        this._newsList = newsList;
      }
    })
   }

  ngOnInit(): void {
    if (this._newsList == null) {
      this.newsSupport.getAllNews(true);
    }
  }

  sysout(str:any) {
    console.log(str);
  }

}
