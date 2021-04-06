import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CrowMapMarker, GoogleMapMarker } from 'src/model/CrowMapMarker';
import { MapSupportService } from '../map-support.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  panning = true;
  map_loaded:boolean = true;
  clicked:boolean = false;
  boolFilters = CrowMapMarker.boolFilters;
  dropDownFilters = CrowMapMarker.dropDownFilters;
  form:FormGroup;
  selectedMarker:GoogleMapMarker;
  mapMarkers:Array<GoogleMapMarker>; 


  constructor(httpClient: HttpClient, private mapSupport:MapSupportService, private formBuilder: FormBuilder) {
    mapSupport.mapElements.subscribe(mapArray => {
      if (mapArray != null) {
        this.mapMarkers = mapArray;
        this.map_loaded = true;
        this.clicked = false;

        let data = new Map<string, string>();
        this.mapMarkers.forEach( (e:CrowMapMarker) => {
          if (!data.has(e.country)) data.set(e.country, e.country);
        });
        this.dropDownFilters = CrowMapMarker.dropDownFilters.concat([["Countries", Array.from(data.keys())]]);
        }
      })
  }

  ngOnInit(): void {
    this.mapSupport.getMapData();

    this.form = this.formBuilder.group({
      crow_material: ['', Validators.nullValidator],
      digital_collection: ['', Validators.nullValidator],
      Continent: ['', Validators.nullValidator],
      Countries: ['', Validators.nullValidator],
    })

  }

  showMarker(title:string){
    // This allows us to bounce the last selected marker without nulling a value
    if (this.selectedMarker != null) this.selectedMarker.animation = "";
    //this.panning = true;
    this.selectedMarker = this.mapSupport.getSelectedMarkerFromTitle(title);
    //this.zoom = 10;
    //this.zoom = 17;
    this.lat = this.selectedMarker.lat;
    this.lng = this.selectedMarker.lng;
    this.selectedMarker.animation = "BOUNCE";
    this.clicked = true;
    //this.panning = false;
  }

  asCrowMapMarker(marker:GoogleMapMarker): CrowMapMarker {
    return marker as CrowMapMarker;
  }

  isClickable() {
    if (true) {
      return 'disabled-pointer';
    }
  }

  filterData() {
    let stringArray:any[][] = [['crow_material', this.form.controls.crow_material.value],
                                ['digital_collection', this.form.controls.digital_collection.value],
                                ['continent', this.form.controls.Continent.value],
                                ['countries', this.form.controls.Countries.value]];
    this.mapSupport.getFilterData(null);
    //this.submitted == true;
    if (this.form.invalid) {
      return;
    }
    console.log(stringArray);
  }

}

