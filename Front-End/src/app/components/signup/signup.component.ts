import { DialogRef } from '@angular/cdk/dialog';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  // dialogRef: DialogRef<SignupComponent>;
  constructor(
    private _formBuilder : FormBuilder,
    private _router: Router,
    private ngZone: NgZone,
    private dialogRef: DialogRef<SignupComponent>,
    private _ngxService : NgxUiLoaderService,
    private _userService: UserService,
    private _snackbar: SnackbarService
  ){}
  registerForm: any = FormGroup;
  responseMsg: any;
  ngOnInit(): void {
  this.registerForm = this._formBuilder.group({
    username: [null,[Validators.required, Validators.pattern(globalProperties.nameRegex)]],
    password: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegex)]],
    cnumber: [null,[Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]]
  })
  }

onRegister(){
  this._ngxService.start()
  var formData = this.registerForm.value;
  var data = {
    username: formData.username,
    cnumber: formData.cnumber,
    email: formData.email,
    password: formData.password,
  }
  console.log("Form Data:", data)
  this._userService.signup(data).subscribe((res: any) => {
    this._ngxService.stop()
    this.dialogRef.close()
    this.responseMsg = res?.message
    console.log("Response Message: ", this.responseMsg)
    this._snackbar.openSnackbar(this.responseMsg,'')
    this._router.navigate(['/'])
  },(err)=> {
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg,globalProperties.error)
  })
}
onClose(){
 // this.dialogRef.close();
  this.ngZone.run(() => {
    this.dialogRef.close();
  });
}




}
