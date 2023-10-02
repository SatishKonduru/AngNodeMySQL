import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public url :string = environment.apiUrl;
  constructor(private _http: HttpClient) { }
  getDetails(){
    return this._http.get(this.url+"/dashboard/details")
  }
}
