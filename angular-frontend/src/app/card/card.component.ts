import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  API_URL = environment.apiUrl;
  @Input() cover_image; 
  @Input() title; 
  @Input() id; 
  @Input() number; 
  @Input() route; 

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }  
  mouseOver() {
    let cbs = Array.from(document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>)
    for (var i = 0; i < cbs.length; i++) {
      cbs[this.number].style.opacity = "1"; 
    }
  }
  mouseOut() {
    let cbs = Array.from(document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>)
    for (var i = 0; i < cbs.length; i++) {
      cbs[this.number].style.opacity = "0"; 
    }
  }

}
