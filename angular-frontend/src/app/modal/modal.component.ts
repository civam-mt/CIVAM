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
<<<<<<< HEAD
    this.item.showNavigationArrows = true;
    this.item.showNavigationIndicators = true;
=======
>>>>>>> ad9cc75e819855cd09d4b1f87d092980aa67808a
  }
}
