import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';
import { CategoryComponent } from '../category/category.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit{
  displyedColumns: string[] = ['name', 'edit']
  dataSource : any;
  responseMsg : any;
  searchKey: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  constructor(
    private _categoryService: CategoryService,
    private _ngxService: NgxUiLoaderService,
    private _userDialog: MatDialog,
    private _snackbar: SnackbarService,
    private _router: Router
  ){}

ngOnInit(): void {
  this._ngxService.start()
  this.tableData()
}

tableData() {
  this._categoryService.getCategories().subscribe((res: any) => {
    this._ngxService.stop()
    this.dataSource = new  MatTableDataSource(res)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }, (err : any) => {
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

applyFilter(filterValue: string){
  this.dataSource.filter = filterValue.trim().toLowerCase()
}
addCategory(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    action: 'Add'
  }
  dialogConfig.width = "300px";
  dialogConfig.disableClose = true;
  dialogConfig.position= {top: '100px', left: '48rem'}
  const dialogRef = this._userDialog.open(CategoryComponent, dialogConfig)
  this._router.events.subscribe(() => {
    dialogRef.close()
  })
  //to refresh the table data from onAddCategory emmitter
  const sub = dialogRef.componentInstance.onAddCategory.subscribe((res:any) => {
    this.tableData()
  })
}
editCategory(item: any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    action: 'Edit',
    data : item
  }
  dialogConfig.width = "300px";
  dialogConfig.disableClose = true;
  dialogConfig.position= {top: '100px', left: '48rem'}
  const dialogRef = this._userDialog.open(CategoryComponent, dialogConfig)
  this._router.events.subscribe(() => {
    dialogRef.close()
  })
  //to refresh the table data from onEditCategory emmitter
  const sub = dialogRef.componentInstance.onEditCategory.subscribe((res:any) => {
    this.tableData()
  })
}
onSearchClear(){
  this.searchKey = ''
  this.applyFilter('')
}


}
