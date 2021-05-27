import { Component } from '@angular/core';
import { MetaDataService } from './../app/services/meta-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    "(window:resize)":"onWindowResize($event)"
  }
})
export class AppComponent {
  title = 'angular-frontend';

  constructor (private meta:MetaDataService) {

  }

  onWindowResize(event) {
    this.meta.setWidth(event.target.innerWidth);
  }

  ngOnInit() {
    this.meta.setWidth(window.innerWidth);
  }
}
