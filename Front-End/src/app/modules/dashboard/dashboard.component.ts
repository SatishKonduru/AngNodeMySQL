import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
responseMsg: any;
data :any
constructor(private _dashboardService: DashboardService, private _ngxService: NgxUiLoaderService, private _snackbarService: SnackbarService){
  this._ngxService.start()
  this.getDashboardData()
}

getDashboardData(){
  this._dashboardService.getDetails()
  .subscribe((res: any) => {
    this._ngxService.stop()
    this.data = res
  }, (err) => {
    this._ngxService.stop()
    console.log("Error while getting Dashboard Data: ", err)
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbarService.openSnackbar(this.responseMsg, globalProperties.error)
  })
}


}
