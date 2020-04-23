import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';

@Component({
  selector: 'app-picture-collections',
  templateUrl: './picture-collections.component.html',
  styleUrls: ['./picture-collections.component.scss']
})
export class PictureCollectionsComponent implements OnInit {
  collections: Collection[] = DISTRICTS;

  constructor() { }

  ngOnInit(): void {
  }

}
