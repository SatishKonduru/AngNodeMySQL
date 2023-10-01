import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  public url = environment.apiUrl;

  signup(data: any): Observable<any> {
    return this._http.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  forgotPassword(data: any): Observable<any>{
    return this._http.post(this.url+'/user/forgotPassword', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  login(data: any){
    return this._http.post(this.url+'/user/login',data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}