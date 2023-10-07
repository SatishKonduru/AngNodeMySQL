import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
changePasswordForm : any = FormGroup;
responseMsg: any;
constructor(
  private _formBilder: FormBuilder,
  private _ngxService: NgxUiLoaderService,
  private _userService: UserService,
  private _dialogRef: MatDialogRef<ChangePasswordComponent>,
  private _snackbar: SnackbarService
){}

ngOnInit(): void {
  this.changePasswordForm = this._formBilder.group({
    oldPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
    confirmPassword: [null, Validators.required]
  }) 
}
validatePassword(){
  if(this.changePasswordForm.controls['newPassword'] != this.changePasswordForm.controls['confirmPassword']){
    return true
  }
  else{
    return false
  }
}

changePassword(){
  this._ngxService.start()
  var formData = this.changePasswordForm.value
  var data = {
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword,
    confirmPassword: formData.confirmPassword
  }
  this._userService.changePassword(data)
  .subscribe((res: any) => {
    this._ngxService.stop()
    this.responseMsg = res?.message
    this._dialogRef.close()
    this._snackbar.openSnackbar(this.responseMsg, 'Success')
  }, (err)=> {
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })


}


}
