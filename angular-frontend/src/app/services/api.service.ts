import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { AbstractJsEmitterVisitor } from '@angular/compiler/src/output/abstract_js_emitter';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  
  public getCollections() {
    return this.httpClient.get(`${this.API_URL}/api/collections/`);
  }
  public getKeywordSearch(query: string){
    return this.httpClient.get(`${this.API_URL}/api/keywords/?data=${query}`);
  }
  public getSearch(query : string){
    return this.httpClient.get(`${this.API_URL}/api/search-result/?data=${query}`);
  }
  public getItemByKeyword(keyword: string){
    return this.httpClient.get(`${this.API_URL}/api/items/all/${keyword}`);
  }
  public getItems() {
    return this.httpClient.get(`${this.API_URL}/api/items/all/`);
  }
  public getItemByItemID(itemID: string) {
    return this.httpClient.get(`${this.API_URL}/api/items/${itemID}/`);
  }
  public getItemByCollectionIDItemID(collectionID: string, itemID: string) {
    return this.httpClient.get(`${this.API_URL}/api/collections/${collectionID}/${itemID}/`);
  }
  public getCollectionByCollectionID(collectionID: string, keywordIds: string[]) {
    const keywordIdsString = JSON.stringify(keywordIds);
    return this.httpClient.get(`${this.API_URL}/api/collections/${collectionID}/?keywordIds=${keywordIdsString}`);
  }
  public getAllGroupsByCollectionID(collectionID: string) {
    return this.httpClient.get(`${this.API_URL}/collections/${collectionID}/groups/`);
  }
  public getGroupByCollectionIDGroupID(collectionID: string, groupID: string) {
    return this.httpClient.get(`${this.API_URL}/collections/${collectionID}/groups/${groupID}/`);
  }
  public getPoriByPoriID(poriID: string) {
    return this.httpClient.get(`${this.API_URL}/api/pori/${poriID}/`);
  }
  public getPoris() {
    return this.httpClient.get(`${this.API_URL}/api/pori/all/`);
  }
  public getSiteTextByLocation(loc: string) {
    return this.httpClient.get(`${this.API_URL}/api/sitetext/${loc}`);
  }
  public addNarratives(data: any) {
    return this.httpClient.post<any>(`${this.API_URL}/api/narratives/` ,data);
  }
  public getAllNews():Observable<Object> {
    return this.httpClient.get(`${this.API_URL}/api/article/all`);
  }
  public getNewsByTag(_id:any):Observable<Object> {
    return this.httpClient.post(`${this.API_URL}/api/article/tag/`, _id);
  }
  public getNewsArticleByID(_id:string):Observable<Object> {
    return this.httpClient.get(`${this.API_URL}/api/article/id/${_id}`);
  public getAllMapdata() {
    return this.httpClient.get(`${this.API_URL}/api/mapdata/all/`);
  }
  
  // public postCollection(collection: object) {
  //   return this.httpClient.post(`${this.API_URL}/api/collections`, collection);
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
