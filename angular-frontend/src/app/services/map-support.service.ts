import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { CrowMapMarker, GoogleMapMarker } from 'src/model/CrowMapMarker';
import { isBoolean } from 'util';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MapSupportService {

  private _mapElementsMaster: BehaviorSubject<Array<GoogleMapMarker>> = new BehaviorSubject<Array<GoogleMapMarker>>(null);
  originalMapElements: Array<GoogleMapMarker> = new Array<GoogleMapMarker>(null);
  mapElements: BehaviorSubject<Array<GoogleMapMarker>> = new BehaviorSubject<Array<GoogleMapMarker>>(null);
  mapElementsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiHelper: ApiService) {

  }

  // Call this function to update and notify all those dependent on the public map data
  private _updateSiteFacingData(newArray:Array<GoogleMapMarker>):void {
    this.mapElements.next(newArray);
    this.mapElementsLoaded.next(true);
  }

  getMapData() {
    if (this.mapElements.getValue() == null) {
      let cmm = new Array<CrowMapMarker>();

      this.apiHelper.getAllMapdata()
        .subscribe(result => {
          //console.log(result);
          result['mapdata'].forEach(element => {
            //console.log(element);
            cmm.push(new CrowMapMarker(parseFloat(element['lat']), parseFloat(element['lng']), element['name'],
              element['crow_material'], element['digital_collection'], element['replied_to_contact'],
              element['obj_photo'], element['street'], element['city'], element['province'],
              element['country'], CrowMapMarker.asContinent(element['continent']), element['code'],
              element['url'], element['svg'], element['notes'], element['history'], element['cover_image']));
          });
          this._mapElementsMaster.next(cmm);
          this.originalMapElements = cmm;
          this._updateSiteFacingData(cmm);
        });
    }
  }

  // Will return the map marker with the asssociated title
  getSelectedMarkerFromTitle(title: string): GoogleMapMarker {
    return this.mapElements.getValue().filter((x: GoogleMapMarker) => {
      return x.title == title;
    })[0];
  }

  getSortedData(sort: (x1:GoogleMapMarker, x2:GoogleMapMarker) => number) {
    this._updateSiteFacingData(this._mapElementsMaster.getValue().sort(sort));
  }

  
  getFilterData(args:string[][]):void {
    let filterArray: Array<GoogleMapMarker> = new Array<GoogleMapMarker>();
    this._mapElementsMaster.getValue().forEach(element => {
      if (element.filter(args)) {
        filterArray.push(element);
      }
    });
    this._updateSiteFacingData(filterArray)
  }

  //changes the filtered array back to the original
  clearFilterData(): void {
    this._updateSiteFacingData(this.originalMapElements);
  }
}

