import { Component, OnInit, Input } from '@angular/core';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import {UsernameService} from '../auth/username.service';
import * as jwt_decode from 'jwt-decode'; 

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [NgbNavConfig],
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() activeClass = 'active';
  // isLoggedIn = false;
  // username;  
  // userId;
  // name;
  // constructor(private usernameService: UsernameService) { }

  constructor(config: NgbNavConfig) {

    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }

  ngOnInit() {
  //   this.usernameService.change.subscribe(isLoggedIn => { 
  //     this.isLoggedIn = isLoggedIn; 
  //     if (!isLoggedIn) {
  //       this.username = '';
  //       this.userId = '';
  //       this.name = '';
  //     } else {
  //       console.log("logged in");
  //       this.username = (jwt_decode(localStorage.getItem('token')) as Username).username;
  //       this.userId = jwt_decode(localStorage.getItem('token'))._id;
  //       this.name = jwt_decode(localStorage.getItem('token')).firstName;
  //     }
  //   }); 
  }

}

// import {Component} from '@angular/core';

// @Component({
//   selector: 'ngbd-nav-custom-style',
//   templateUrl: './nav-custom-style.html'
// })
// export class NgbdNavCustomStyle { }
