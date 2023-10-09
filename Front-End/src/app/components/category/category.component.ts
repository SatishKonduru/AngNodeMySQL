import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Event, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{


ngOnInit(): void {
 
}




}
