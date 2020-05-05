import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { environment } from '../environments/environment';
// import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  
  public getCollections() {
    return this.httpClient.get(`${this.API_URL}/api/collections`);
  }
  public getItemByCollectionIDItemID(collectionID: string, itemID: string) {
    return this.httpClient.get(`${this.API_URL}/collections/${collectionID}/${itemID}`);
  }
  public getCollectionByCollectionID(collectionID: string) {
    return this.httpClient.get(`${this.API_URL}/api/collections/${collectionID}/`);
  }
  public getAllGroupsByCollectionID(collectionID: string) {
    return this.httpClient.get(`${this.API_URL}/collections/${collectionID}/groups/`);
  }
  public getGroupByCollectionIDGroupID(collectionID: string, groupID: string) {
    return this.httpClient.get(`${this.API_URL}/collections/${collectionID}/groups/${groupID}/`);
  }
  // public postSong(song: object) {
  //   return this.httpClient.post(`${this.API_URL}/api/songs`, song);
  // }
  // public postPost(songId: string, post: any) {
  //   if (localStorage.getItem('token') !== null){
  //     const header = {
  //      headers: new HttpHeaders()
  //         .set('Authorization', localStorage.getItem('token'))
  //     }
  //     return this.httpClient.post(`${this.API_URL}/api/songs/${songId}/posts`, post, header);
  //   } 
  //   else{
  //     return this.httpClient.post(`${this.API_URL}/api/songs/${songId}/posts`, post);
  //   } 
  // }
  // public login(username: string, password: string){ 
    
  //   return this.httpClient.post(`${this.API_URL}/api/login`, {'username': username, 'password': password}, {observe: 'response'}); 
  // }
  // public register(username: string, firstName: string, lastName: string, password: string){ 
    
  //   return this.httpClient.post(`${this.API_URL}/api/register`, {'username':username, 'firstName': firstName, "lastName": lastName, "password": password}, {observe: 'response'}); 
  // }
}
