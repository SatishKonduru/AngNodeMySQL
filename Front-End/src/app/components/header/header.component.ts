import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private _userDialog: Dialog){}
  userSignup(){
    const dialogConfig  = new MatDialogConfig()
    dialogConfig.width = "70rem"
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this._userDialog.open(SignupComponent, dialogConfig)
    
  }

  userLogin(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "70rem"
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this._userDialog.open(LoginComponent,dialogConfig)
  }
}
