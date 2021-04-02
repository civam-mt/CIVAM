import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CrowMapMarker, GoogleMapMarker } from 'src/model/CrowMapMarker';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MapSupportService {

  private _mapElementsMaster: BehaviorSubject<Array<GoogleMapMarker>> = new BehaviorSubject<Array<GoogleMapMarker>>(null);
  mapElements: BehaviorSubject<Array<GoogleMapMarker>> = new BehaviorSubject<Array<GoogleMapMarker>>(null);
  mapElementsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiHelper: ApiService) {

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
              element['country'], element['continent'], element['code'], element['url'], element['svg']));
          });
          this.mapElements.next(cmm);
          this._mapElementsMaster.next(cmm);
          this.mapElementsLoaded.next(true);
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
    this.mapElements.next(this._mapElementsMaster.getValue().sort(sort));
  }
}

