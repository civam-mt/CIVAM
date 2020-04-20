import { Component, OnInit } from '@angular/core';
// import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';

// Collection import just won't work, so this is here as a workaround for the moment
export interface Collection {
    name: string;
    description: string;
    image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredCollections: Collection[] = DISTRICTS.slice(0, 6);

  constructor() { }

  ngOnInit(): void {
    
  }

}
