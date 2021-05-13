import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SiteTextSupportService {

  private _textMap:Map<string, string>;

  constructor(private api:ApiService) { 
    this._textMap = new Map<string, string>();
  }

  getSiteText(req:string):string {
    if (this._textMap.has(req)) return this._textMap.get(req);
    this._siteTextApiWrapper([req]);
    return this._textMap.get(req);
  }

  getManySiteText(req:string[]):[string, string][] {
    let arr:Array<[string, string]>;
    req.forEach((str) => {
      if (this._textMap.has(str)) arr.push([str, this._textMap.get(str)]);
      else {
        this._siteTextApiWrapper([str]);
        arr.push([str, this._textMap.get(str)]);
      }
    });
    return arr;
  }

  private _siteTextApiWrapper(req:string[]) {
    @(ts-ignore)
    for (var i = 0; i < req.length; i++) {
      this.api.getSiteTextByLocation(req[i]).subscribe((data) => { 
        this._textMap.set(req[i], data['content']);
        }
      );
    }
  }
}
