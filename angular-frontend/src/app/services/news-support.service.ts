import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewsArticle } from 'src/model/NewsArticle';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsSupportService {
  private _newsMasterList:BehaviorSubject<Array<NewsArticle>> = new BehaviorSubject<Array<NewsArticle>>(null);
  public newsList:BehaviorSubject<Array<NewsArticle>> = new BehaviorSubject<Array<NewsArticle>>(null);

  constructor(private apiService:ApiService) { }

  getAllNews(override:boolean = false) {
    if (this._newsMasterList.getValue() == null || override) {
      let tmp_arr:Array<NewsArticle> = new Array<NewsArticle>();
    this.apiService.getAllNews().subscribe(response => {
      response['articles'].forEach(article => {
        tmp_arr.push(new NewsArticle(article['article_id'], article['title'], 
          article['cover'], article['content'], new Date(article['published_on']), 
          article['tags'].map(tag => {
            return NewsArticle.convertJSONToTag(tag);
          }), article['author']));
      });
    });
    this._newsMasterList.next(tmp_arr);
    this.newsList.next(tmp_arr);
    }
    else {
      this.newsList.next(this._newsMasterList.getValue());
    }
  }

}
