import { Injectable } from '@angular/core';
import { Behavior } from 'popper.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {
  private _width:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  public setWidth(n:number) {
    this._width.next(n);
  }

  public getWidth():number {
    return this._width.value;
  }

  public getBehavioSubject():BehaviorSubject<number> {
    return this._width;
  }
}
