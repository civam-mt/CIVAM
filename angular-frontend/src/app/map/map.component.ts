import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CrowMapMarker, GoogleMapMarker } from 'src/model/CrowMapMarker';
import { MapSupportService } from '../map-support.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tile, MapTile } from 'src/model/Tile';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  API_URL = environment.apiUrl;
  tiles: MapTile[] = [
    {text: 'name', cols:4, rows:1, color:'lightgreen'},
    {text: 'cityProvinceCountry', cols:2, rows: 1, color: 'lightblue'},
    {text: '', cols:2, rows: 3, color: 'lightblue'},
    {text: 'notes', cols:4, rows:2, color: 'lightpink'},
    {text: 'url', cols:4, rows:1, color: '#DDBDF1'},
  ];
  public siteText:string;

  public lat = 0;
  public lng = 0;
  public zoom = 2;
  public panelOpenState = false;
  public panning = true;
  public map_loaded:boolean = true;
  public clicked:boolean = false;
  public boolFilters = CrowMapMarker.boolFilters;
  public dropDownFilters = CrowMapMarker.dropDownFilters;
  public form:FormGroup;
  public selectedMarker:GoogleMapMarker;
  public mapMarkers:Array<GoogleMapMarker>; 


  constructor(httpClient: HttpClient, private mapSupport:MapSupportService, private formBuilder:FormBuilder, private apiService:ApiService) {
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

    this.getSiteTexts();
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
    let stringArray:string[][] = [['crow_material', this.form.controls.crow_material.value],
                                ['digital_collection', this.form.controls.digital_collection.value],
                                ['continent', this.form.controls.Continent.value],
                                ['countries', this.form.controls.Countries.value]];
    this.mapSupport.getFilterData(stringArray);
    //this.submitted == true;
    if (this.form.invalid) {
      return;
    }
  }

  getSiteTexts() {
    this.apiService.getSiteTextByLocation('MAP_CON').subscribe((data) => {
      this.siteText = data["content"];
    });
  }

}

