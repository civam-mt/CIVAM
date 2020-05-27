import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pori',
  templateUrl: './pori.component.html',
  styleUrls: ['./pori.component.scss']
})
export class PoriComponent implements OnInit {
  API_URL = environment.apiUrl;
  pori;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPoriByPoriID(params.get('poriID'));
    });
  }

  getPoriByPoriID(poriID: string) {
    this.api.getPoriByPoriID(poriID).subscribe((data) => {
      this.pori = data;
    });
  }

}
