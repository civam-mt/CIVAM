import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { DISTRICTS } from '../mock-collections';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collection: Collection;

  constructor() { 
    // TODO: Find collection by id from url
    this.collection = DISTRICTS[0];
  }

  ngOnInit(): void {
  }

}
