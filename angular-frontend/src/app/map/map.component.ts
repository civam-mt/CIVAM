import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CrowMapMarker, GoogleMapMarker } from 'src/model/CrowMapMarker';
import { MapSupportService } from '../map-support.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  title = 'My first AGM project';
  lat = 0;
  lng = 0;
  zoom = 2;
  map_loaded:boolean = true;
  clicked:boolean = false;
  selectedMarker:GoogleMapMarker;
  mapMarkers:Array<GoogleMapMarker>; 

  constructor(httpClient: HttpClient, private mapSupport:MapSupportService) {
    mapSupport.mapElements.subscribe(mapArray => {
      this.mapMarkers = mapArray;
      this.map_loaded = true;
      this.clicked = false;
    })
  }

  ngOnInit(): void {
    this.mapSupport.getMapData();
  }

  showMarker(title:string){
    this.clicked = true;
    this.selectedMarker = this.mapSupport.getSelectedMarkerFromTitle(title);
    console.log(this.selectedMarker);
  }

  asCrowMapMarker(marker:GoogleMapMarker): CrowMapMarker {
    return marker as CrowMapMarker;
  }

}

