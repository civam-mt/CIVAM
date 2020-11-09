import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  tempCollections: Collection[] = DISTRICTS;

  API_URL = environment.apiUrl;
  @Input() cover_image; 
  @Input() title; 
  @Input() id; 

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }  

}
