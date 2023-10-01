import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm: any = FormGroup
  responseMsg : any
  constructor(
   private _formBilder: FormBuilder,
   private _ngZone : NgZone,
   private dialogRef: MatDialogRef<ForgotPasswordComponent>,
   private _ngxService: NgxUiLoaderService,
   private _userService: UserService,
   private _snackbarService: SnackbarService,
   private _router: Router
  ){}

ngOnInit(): void {
  this.forgotPasswordForm = this._formBilder.group({
    email: [null,[Validators.required, Validators.pattern(globalProperties.emailRegex)]]
  })
}
forgotPassword(){
  console.log("Forgot?")
  this._ngxService.start()
  var formData = this.forgotPasswordForm.value
  var data = {
    email: formData.email
  }
  console.log("Email: ", data)
  
  this._userService.forgotPassword(data)
  .subscribe((res: any)=> {
    this._ngxService.stop()
    this.responseMsg = res?.message
    this._snackbarService.openSnackbar(this.responseMsg,'')
  }, (err)=> {
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg = err.error?.message

    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbarService.openSnackbar(this.responseMsg, globalProperties.error)
  })
  this.dialogRef.close()
}

// onClose(){
//   //  this.dialogRef.close()
//     this._ngZone.run(() => {
//      this.dialogRef.close();
//   });
// }
}
