import { Component, OnInit } from '@angular/core';
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
  tiles: Tile[] = [
    {text: 'cover_url', cols:1, rows:3, color:'lightgreen'},
    {text: 'content', cols:3, rows: 3, color: 'lightblue'},
    {text: 'author', cols:1, rows:1, color: 'lightpink'},
    {text: 'tags.text', cols:3, rows:1, color: '#DDBDF1'},
  ];

  constructor(private newsSupport:NewsSupportService) {
    newsSupport.newsList.subscribe(newsList => {
      if (newsList != null) {
        this._newsList = newsList;
        console.log(this._newsList);
      }
    })
   }

  ngOnInit(): void {
    if (this._newsList == null) {
      this.newsSupport.getAllNews();
    }
  }

}
