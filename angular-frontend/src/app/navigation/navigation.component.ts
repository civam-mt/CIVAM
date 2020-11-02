import { Component, OnInit, Input } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsernameService } from '../auth/username.service';
import * as jwt_decode from 'jwt-decode';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [NgbNavConfig],
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  searched = '';
  keywordOptions: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;




  @Input() activeClass = 'active';
  // isLoggedIn = false;
  // username;  
  // userId;
  // name;
  // constructor(private usernameService: UsernameService) { }

  constructor(config: NgbNavConfig, private router: Router, private api: ApiService) {

    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }

  onSubmit() {
    //this.router.navigate(['/search-result']);

    this.router.navigate(['/search-result', { 'data': this.myControl.value }]);
  }
/*
.subscribe((data) => {
      this.keywordOptions = data["keywords"];
      console.log(this.keywordOptions);
      return this.keywordOptions;
    });
*/

/* 
  private _filter(value: string): string[] {

    return this.getData(value)
    .pipe(
      map(response => response.filter(option => { 
        return option.name.toLowerCase().indexOf(value.toLowerCase()) === 0
      }))
    )
   const
 filterValue = value.toLowerCase();
    if (value[0] != this.searched){
        this.searched = value[0];
        this.api.getKeywordSearch(value[0]).subscribe((data) => {
        this.keywords = data["keywords"];
        console.log(this.keywords);
      });

    }
    else{
      console.log(value);
      return this.keywords.filter(option => option.toLowerCase().includes(filterValue));
    }
   */
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.keywordOptions.filter(option => option.toLowerCase().includes(filterValue));
  }


  ngOnInit() {
    this.api.getKeywordSearch("").subscribe((data) => {
      this.keywordOptions = data["keywords"];
      console.log(this.keywordOptions);
    });
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value))
    );

/*
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      */
  }
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

// import {Component} from '@angular/core';

// @Component({
//   selector: 'ngbd-nav-custom-style',
//   templateUrl: './nav-custom-style.html'
// })
// export class NgbdNavCustomStyle { }
