import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection'
import { DISTRICTS } from '../mock-collections';

@Component({
  selector: 'app-oral-histories',
  templateUrl: './oral-histories.component.html',
  styleUrls: ['./oral-histories.component.scss']
})
export class OralHistoriesComponent implements OnInit {
  collections: Collection[] = DISTRICTS;

  constructor() { }

  ngOnInit(): void {
  }

}
