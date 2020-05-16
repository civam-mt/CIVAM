import { Injectable, Output, EventEmitter } from '@angular/core'; 

@Injectable()
export class UsernameService {

  isLoggedIn = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle(result: boolean) {
    this.isLoggedIn = result;
    this.change.emit(this.isLoggedIn);
  }

}