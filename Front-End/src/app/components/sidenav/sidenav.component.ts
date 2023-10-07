import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import jwt_decode from 'jwt-decode'
import { MenuItems } from 'src/app/shared/menu-items';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
 
  // token: any = localStorage.getItem('token')
  token : any
  tokenPayload: any;
  constructor(public menuItems: MenuItems){
    // this.tokenPayload = jwt_decode(this.token)
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token')
      this.tokenPayload = jwt_decode(this.token)
    }
  }

}
