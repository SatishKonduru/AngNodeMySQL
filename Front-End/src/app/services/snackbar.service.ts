import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar : MatSnackBar) { }

  openSnackbar(msg: string, action: string ){

    if(action === 'error'){
        this._snackBar.open(msg, '',{
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass : ['error-snackbar']
        })
    }
    else{
      this._snackBar.open(msg, '',{
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
        panelClass : ['success-snackbar']
      })
    }
  }

}
