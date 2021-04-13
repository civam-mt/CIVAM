import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  toggleButton = false;
  buttonMessage = "";

  constructor() { }

  ngOnInit(): void {
    this.buttonMessage = "Expand map";
  }

  makeFullScreen() {
    this.toggleButton = !this.toggleButton;
    if (this.toggleButton) {
      this.buttonMessage = "Shrink map";
    } else {
      this.buttonMessage = "Expand map";
    }
  }
}

