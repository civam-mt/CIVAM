import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';

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

  ngOnInit(): void { }

  mouseOver() {
    let cbs = Array.from(document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>)
    for (var i = 0; i < cbs.length; i++) {
      cbs[this.number].style.opacity = "1"; 
    }
  }
  mouseOut() {
    let cbs = Array.from(document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>)
    for (var i = 0; i < cbs.length; i++) {
      if (cbs[this.number].className != "card-body no-image") { // this is pretty hacky, but the idea is that, if there's no image, 
        cbs[this.number].style.opacity = "0";                   // we don't want to hide the words on the card. this implementation 
      }                                                         // works, but it could definitely be cleaned up. 
    }
  }

}
