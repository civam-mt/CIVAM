import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CrowMapMarker, GoogleMapMarker } from 'src/model/CrowMapMarker';
import { MapSupportService } from '../map-support.service';
import {MatExpansionModule} from '@angular/material/expansion';

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
  panelOpenState = false;
  panning = false;
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

    console.log(this.mapSupport.mapElements);
  }

  showMarker(title:string){
    // This allows us to bounce the last selected marker without nulling a value
    if (this.selectedMarker != null) this.selectedMarker.animation = "";
    this.clicked = true;
    this.panning = true;
    this.selectedMarker = this.mapSupport.getSelectedMarkerFromTitle(title);
    //this.zoom = 10;
    //this.zoom = 17;
    this.lat = this.selectedMarker.lat;
    this.lng = this.selectedMarker.lng;
    this.selectedMarker.animation = "BOUNCE";
    this.panning = false;
  }

  asCrowMapMarker(marker:GoogleMapMarker): CrowMapMarker {
    return marker as CrowMapMarker;
  }

  isClickable() {
    if (true) {
      return 'disabled-pointer';
    }
  }

}

