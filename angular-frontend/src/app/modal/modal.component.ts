import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() item; 
  @Input() API_URL; 
  @Input() image; 

  constructor() { }

  ngOnInit(): void { 
  }
  hideModal() {
    this.item.showModal = false; 
    this.item.showNavigationArrows = true;
    this.item.showNavigationIndicators = true;
  }
}
