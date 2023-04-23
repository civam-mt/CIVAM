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
    {text: 'cover_image', cols: 4, rows: 4},    
    {text: 'name', cols: 4, rows: 2},
    {text: 'cityProvinceCountry', cols: 4, rows: 1},
    {text: 'history', cols: 4, rows: 3},
    {text: 'crow_material', cols: 2, rows: 1},
    {text: 'digital_collection', cols: 2, rows: 1}
  ];
  txtTile: MapTile[] = [
    {text: 'crow_material', cols: 1, rows: 1},
    {text: 'digital_collection', cols: 1, rows: 1},
  ];
  public siteText:string;

  public lat = 45;
  public lng = -40;
  public zoom = 3.4;
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
  public previous_info_window = null;


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
        //this.dropDownFilters = CrowMapMarker.dropDownFilters.concat([["Countries", Array.from(data.keys())]]);
	this.dropDownFilters = [["Countries", Array.from(data.keys())]]
        }
      })
  }

  ngOnInit(): void {
    this.mapSupport.getMapData();

    this.form = this.formBuilder.group({
      crow_material_val: ['', Validators.nullValidator],
      digital_collection_val: ['', Validators.nullValidator],
      Continent: ['', Validators.nullValidator],
      Countries: ['', Validators.nullValidator],
    })

    this.getSiteTexts();
   }

  //Called when the map is clicked. closes any open info windows.
  //TODO: Make it so that when a map cluster icon is clicked, any open info windows close.
  close_window(){
    if (this.previous_info_window != null){
       this.previous_info_window.close()
    }
  }

  //This function handles showing the marker's info window. The "clicked" field is what gets passed back to the html file for the agm-info-window tag  
  showMarker(title:string, infoWindow: any){
    this.selectedMarker = this.mapSupport.getSelectedMarkerFromTitle(title);
    this.clicked = true;
    
    //This makes it so that if you click a new marker while having an info window open for another marker, the info window for the previous window closes.   
    if(this.previous_info_window == null){
      this.previous_info_window = infoWindow
    }
    else{
      this.previous_info_window.close()
      this.previous_info_window = infoWindow;    
    }
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
    let stringArray:string[][] = [['crow_material_val', this.form.controls.crow_material_val.value],
                                ['digital_collection_val', this.form.controls.digital_collection_val.value],
                                ['continent', this.form.controls.Continent.value],
                                ['countries', this.form.controls.Countries.value]];
    this.mapSupport.getFilterData(stringArray);
    //this.submitted == true;
    if (this.form.invalid) {
      return;
    }
  }

  clearFilterData(){
   this.mapSupport.clearFilterData();	
  }

  getSiteTexts() {
    this.apiService.getSiteTextByLocation('MAP_CON').subscribe((data) => {
      this.siteText = data["content"];
    });
  }
}
