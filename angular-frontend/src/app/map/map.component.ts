import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CrowMapMarker, GoogleMapMarker } from 'src/model/CrowMapMarker';
import { MapSupportService } from '../services/map-support.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tile, MapTile } from 'src/model/Tile';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { AgmInfoWindow } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  API_URL = environment.apiUrl;
  imgTile: MapTile[] = [
    {text: 'cover_image', cols: 5, rows: 4, color: '', style: ''},
    {text: 'name', cols: 10, rows: 2, color: '', style: ''},
    {text: 'cityProvinceCountry', cols: 10, rows: 1, color: '', style: ''},
    {text: 'url', cols: 10, rows: 1, color: '', style: { 'border-bottom': '#c5c4c4 solid 1px'}},
    {text: 'history', cols: 12, rows: 5, color: '', style: { 'border-right': '#c5c4c4 solid 1px'}},
    {text: 'crow_material', cols: 3, rows: 3, color: '', style: {'text-align':'right'}},
    {text: 'digital_collection', cols: 3, rows: 2, color: '', style: {'text-align':'right'}},
  ];
  txtTile: MapTile[] = [
    {text: 'name', cols: 15, rows: 2, color: '', style: ''},
    {text: 'cityProvinceCountry', cols: 15, rows: 1, color: '', style: ''},
    {text: 'url', cols: 15, rows: 1, color: '', style: { 'border-bottom': '#c5c4c4 solid 1px'}},
    {text: 'history', cols: 12, rows: 5, color: '', style: { 'border-right': '#c5c4c4 solid 1px'}},
    {text: 'crow_material', cols: 3, rows: 3, color: '', style: {'text-align':'right'}},
    {text: 'digital_collection', cols: 3, rows: 2, color: '', style: {'text-align':'right'}},
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
  public toOpen:boolean = true;


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
    this.zoom = 10;
    //this.zoom = 17;
    this.lat = this.selectedMarker.lat;
    this.lng = this.selectedMarker.lng;
    //this.selectedMarker.animation = "BOUNCE";
    this.clicked = true;
    //this.panning = false;
    //this.agmInfo.open();
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

