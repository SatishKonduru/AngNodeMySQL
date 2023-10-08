import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url = environment.apiUrl
  constructor(private _http: HttpClient) { }

  add(data: any){
    this._http.post(this.url+'/category/add', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  update(data: any){
    this._http.patch(this.url+'/category/update', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getCategories(){
    this._http.get(this.url+'/category/get')
  }

}
