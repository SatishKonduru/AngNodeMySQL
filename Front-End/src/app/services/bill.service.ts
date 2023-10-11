import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
public url = environment.apiUrl

  constructor(private _http: HttpClient) { }

generateReport(data : any){
  return this._http.post(this.url+'/bill/generateReport',data,{
    headers: new HttpHeaders().set('Content-Type','application/json')
  })
}

getPdf(data: any) : Observable<Blob>{
return this._http.post(this.url+'/bill/getPdf', data,{responseType: 'blob'})
}


}
