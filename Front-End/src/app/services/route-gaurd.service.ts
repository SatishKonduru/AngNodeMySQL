import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';
import { globalProperties } from '../shared/globalProperties';
@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService {

  constructor(private _router: Router, public auth: AuthService, private _snackbar : SnackbarService) { }
 
  canActivate(route: ActivatedRouteSnapshot){
    // let expectedRoleArray = route.data
    // console.log("Expected Role Array with Route data: ", expectedRoleArray)
    // expectedRoleArray = expectedRoleArray.expectedRole
    let expectedRoleArray = route.data.expectedRole
    console.log("Expected Role Array: ", expectedRoleArray)
    const token: any = localStorage.getItem('token')
    console.log("Token from Route Guard: ", token)
    var tokenPayload : any;
    try{
      tokenPayload = jwt_decode(token)
      console.log("Decoded Token: ", tokenPayload)
    }
    catch(err){
      localStorage.clear()
      this._router.navigate(['/'])
    }
    let checkRole = false
    for(let i=0; i < expectedRoleArray.length; i++){
      if(expectedRoleArray[i] == tokenPayload.role){
        checkRole = true
      }
    } //for loop ends
    console.log("After loop checkRole status and tokenPayload: ", checkRole, tokenPayload)
    if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
      if(this.auth.isAuthenticated() && checkRole){
        return true
      }
      else{
        this._snackbar.openSnackbar(globalProperties.unauthorized, globalProperties.error)
      }
      this._router.navigate(['/rsk/dashboard'])
      return true
    } 
    else{
      this._router.navigate(['/home'])
      localStorage.clear()
      return false
    }
  }
}
