import { DialogRef } from '@angular/cdk/dialog';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
constructor(
  private _formBuilder : FormBuilder,
  private _router: Router,
  private ngZone: NgZone,
  private dialogRef: DialogRef<LoginComponent>,
  private _ngxService : NgxUiLoaderService,
  private _userService: UserService,
  private _snackbar: SnackbarService
){}
 
loginForm: any = FormGroup;
responseMsg: any;

ngOnInit(): void {
  this.loginForm = this._formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegex)]],
    password: [null, [Validators.required]]
    
  })
}

forgotPassword(){
  
}


onLogin(){
  console.log("Login")
}

onClose(){
  // this.dialogRef.close();
   this.ngZone.run(() => {
     this.dialogRef.close();
  });
}


}
