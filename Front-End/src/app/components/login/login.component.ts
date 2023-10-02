import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

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
  private dialogRef: MatDialogRef<LoginComponent>,
  private _ngxService : NgxUiLoaderService,
  private _userService: UserService,
  private _snackbar: SnackbarService,
  private _userDialog: MatDialog
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
  this.dialogRef.close()
  const dialogConfig = new MatDialogConfig()
  dialogConfig.width = '70rem'
  dialogConfig.position ={right: '10px', top: '5px'}
  dialogConfig.disableClose = true
  this._userDialog.open(ForgotPasswordComponent,dialogConfig)
 
}


userLogin(){
  this._ngxService.start()
  var formData = this.loginForm.value;
  var data = {
    email: formData.email,
    password: formData.password
  }
  this._userService.login(data)
  .subscribe((res:any)=>{
    this._ngxService.stop()
    this.dialogRef.close()
    console.log("Token from Server: ", res.token)
    localStorage.setItem('token', res.token)
    this._router.navigate(['/rsk/dashboard'])
  }, (err) => {
    this._ngxService.stop()
    this.dialogRef.close()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })
  
}

onClose(){
  this.dialogRef.close();
  //  this.ngZone.run(() => {
  //    this.dialogRef.close();
  // });
}


}
