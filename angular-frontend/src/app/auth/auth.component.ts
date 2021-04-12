
import { Component, OnInit, Input, Injectable} from '@angular/core'; 
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl} from '@angular/forms'; 
import * as jwt_decode from 'jwt-decode'; 
import { ApiService } from '../services/api.service';

import { HttpResponse } from '@angular/common/http'; 
// import { ModalService } from '../_modal'; 
import { logging } from 'protractor';

import { UsernameService } from './username.service'; 

export class Response{ 
  token: string; 
  status: string; 
  statusCode: number; 
}
export class httpResponse{ 
  body: object; 
  statusMsg: string; 
  statusCode: number; 
}
export class UserInfo{ 
  _id: string; 
  username: string;
  firstName: string;
  lastName: string
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html', 
  styleUrls: ['./auth.component.scss'], 
})
export class AuthComponent implements OnInit{
  bodyText: string; 
  
  constructor(/*private modalService: ModalService,*/ private apiService: ApiService, private usernameService: UsernameService) { }

  loginText = 'Login';

    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
        
    }

    // TODO: Fix modal service

    // openModal(id: string) {
    //     if (this.loginText === 'Logout') {
    //       this.loginText = 'Login';
    //       this.usernameService.toggle(false);
    //       localStorage.removeItem('token');
    //     } else {
    //     this.modalService.open(id);
    //     }
    // }

    // closeModal(id: string) {
    //     this.modalService.close(id);
    // }
    // register(form: any){ 
    //   console.log(form.value); 
    //   let username: string = form.value.name; 
    //   let password: string = form.value.password; 
    //   let firstName: string = form.value.firstName;
    //   let lastName: string = form.value.lastName; 
    //   console.log(`${username} ${password} ${firstName} ${lastName}`);
    //   this.apiService.register(username, firstName, lastName, password).subscribe((data) => { 
        
    //     let httpResp: HttpResponse<Object> = data as HttpResponse<Object>; 

    //     let body = httpResp.body as unknown as Response; 
    //     console.log(body); 
    //     if (body.statusCode == 200) { 
    //       this.closeModal('custom-modal-1'); 
    //       var contents: Response = body; 
    //       localStorage.setItem('token', contents.token); 
    //       console.log(jwt_decode(contents.token)); 
    //       var bet: UserInfo = jwt_decode(contents.token) as UserInfo; 
    //       alert(`Welcome to Savant, ${bet.firstName}`); 
    //       this.usernameService.toggle(true); 
    //       this.loginText = 'Logout';
    //     } 
    //     else{ 
    //       alert("Unsuccessful registration"); 
    //     }
    //   }); 
      
    // }
    // login(form: any){ 
    //   let username: string = form.value.name; 
    //   let password: string = form.value.password; 

    //   this.apiService.login(username, password).subscribe(data => { 
    //     let httpResp: HttpResponse<Object> = data as HttpResponse<Object>; 
        
    //     console.log(httpResp.status); 
    //     let body: Response = httpResp.body as unknown as Response; 
    //     console.log(body); 
    //     if (body.statusCode == 200){ 
    //       var contents: Response = body; 
    //       localStorage.setItem('token', contents.token); 
    //       var bet: UserInfo = jwt_decode(contents.token) as UserInfo;
    //       alert(`Welcome back, ${bet.username}`); 
    //       this.loginText = 'Logout';
    //       this.closeModal('custom-modal-1'); 
    //       this.closeModal('custom-modal-2'); 
    //       this.usernameService.toggle(true);  
    //       console.log('changed'); 
    //     }
    //     else{ 
    //       alert(`Invalid login`); 
    //     }
    //   }); 
    // }
}