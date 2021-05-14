import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SiteTextSupportService {

  private _textMap:Map<string, string>;
  public loadedElements:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _currentSize:number;
  private _expectedSize:number;

  constructor(private api:ApiService) { 
    this._textMap = new Map<string, string>();
    this._expectedSize = 0;
    this._currentSize = 0;
  }

  getSiteText(req:string):void {
    if (this._textMap.has(req)) return;
    this._expectedSize += 1;
    this._siteTextApiWrapper([req]);
  }

  loadSiteText(req:string):string {
    if (this._textMap.has(req)) return this._textMap.get(req);
    else throw new Error('Attemped to load an element not in the map!');
  }

  getManySiteText(req:string[]):void {
    req.forEach((str) => {
      if (!this._textMap.has(str)) {
        this._expectedSize += 1;
        this._siteTextApiWrapper([str]);
      }
    });
  }

  loadManySiteText(req:string[]):[string, string][] {
    let arr:Array<[string, string]> = new Array<[string, string]>();
    req.forEach((str) => {
      if (this._textMap.has(str)) arr.push([str, this._textMap.get(str)]);
      else throw new Error('Attemped to load an element not in the map!');
    });
    return arr;
  }

  /// Debug method, only premit access during testing!
  private _getAll():Map<string, string> {
    return this._textMap;
  }

  private _siteTextApiWrapper(req:string[]) {
    for (let index of req) {
      this.api.getSiteTextByLocation(index).subscribe((data) => { 
        this._textMap.set(index, data['content']);
        this._currentSize += 1;
        if (this._currentSize == this._expectedSize) this.loadedElements.next(true);
        }
      );
    }
  }
}
