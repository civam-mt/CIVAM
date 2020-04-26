import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  collections: Collection[] = DISTRICTS;

  constructor() { }

  ngOnInit(): void {
  }

}
