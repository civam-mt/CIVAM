import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NewsArticle } from 'src/model/NewsArticle';
import { NewsSupportService } from '../services/news-support.service';

export interface Tile {
  color:string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  _newsList:Array<NewsArticle> = null;
  API_URL = environment.apiUrl;
  tiles: Tile[] = [
    {text: 'title', cols:3, rows:1, color:'lightgreen'},
    {text: '', cols:2, rows:1, color:'#ffffff'},
    {text: 'author', cols:1, rows: 1, color: 'lightblue'},
    {text: 'cover_url', cols:2, rows:3, color:'lightgreen'},
    {text: 'content.bounded', cols:4, rows: 3, color: 'lightblue'},
    {text: 'published_on', cols:1, rows:1, color: 'lightpink'},
    {text: 'tags.text', cols:5, rows:1, color: '#DDBDF1'},
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

}
