import { Component, Input } from '@angular/core';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [NgbNavConfig],
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() activeClass = 'active';

  constructor(config: NgbNavConfig) {

    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }

}

// import {Component} from '@angular/core';

// @Component({
//   selector: 'ngbd-nav-custom-style',
//   templateUrl: './nav-custom-style.html'
// })
// export class NgbdNavCustomStyle { }
