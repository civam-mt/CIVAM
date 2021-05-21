import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
  })

export class ExploreComponent implements OnInit{
  explores;
  API_URL = environment.apiUrl;

  constructor(private api:ApiService){
  }
    ngOnInit(){
      this.getExplores();
    };

    getExplores(){
      this.api.getAllExplores().subscribe((data)=> {
        this.explores = data['explores'];
      });
    }
}