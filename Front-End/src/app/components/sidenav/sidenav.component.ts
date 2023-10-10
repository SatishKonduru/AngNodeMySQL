import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'
import { MenuItems } from 'src/app/shared/menu-items';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit{
 
  // token: any = localStorage.getItem('token')
  token : any
  tokenPayload: any;
  constructor(public menuItems: MenuItems, private _router: Router){
    // console.log("menu items", menuItems.getMenuItems())
    // this.tokenPayload = jwt_decode(this.token)
    // if(localStorage.getItem('token') != null){
    //   this.token = localStorage.getItem('token')
    //   this.tokenPayload = jwt_decode(this.token)
    //   console.log("Role in Token Payload: ", this.tokenPayload.role)
    // }
  }

ngOnInit(): void {
  this.getToken()
}
  getToken(){
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token')
      this.tokenPayload = jwt_decode(this.token)
      console.log("Role in Token Payload: ", this.tokenPayload)
    }
   
  }

ngAfterViewInit(): void {
  this.getToken()
}

}
