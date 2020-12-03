import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  API_URL = environment.apiUrl;
  poris;
  people = [];
  router_route = '/pori';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPoris();
    });
  }

  isPerson(pori: object) {    
    if (pori["isPerson"]) {
      return true;
    } else {
      return false
    }
  }

  getPoris() {
    this.api.getPoris().subscribe((data) => {
      this.poris = data["poris"];
      this.people = this.poris.filter(this.isPerson);
    });
  }

}
