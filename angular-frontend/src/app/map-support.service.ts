import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CrowMapMarker } from 'src/model/CrowMapMarker';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MapSupportService {

  mapElements: BehaviorSubject<Array<CrowMapMarker>> = new BehaviorSubject<Array<CrowMapMarker>>(null);
  mapElementsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiHelper: ApiService) {

  }

  getMapData() {
    if (this.mapElements.getValue() == null) {
      let cmm = new Array<CrowMapMarker>();

      this.apiHelper.getAllMapdata()
        .subscribe(result => {
          console.log(result);
          result['mapdata'].forEach(element => {
            console.log(element);
            cmm.push(new CrowMapMarker(element['lat'], element['lng'], element['name'],
              element['crow_material'], element['digital_collection'], element['replied_to_contact'],
              element['obj_photo'], element['street'], element['city'], element['province'],
              element['country'], element['continent'], element['code'], element['url']));
          });
          this.mapElements.next(cmm);
          this.mapElementsLoaded.next(true);
        });
    }
  }
}

