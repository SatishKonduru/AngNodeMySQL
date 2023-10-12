import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouteGaurdService } from './services/route-gaurd.service';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'rsk',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/rsk/dashboard',
        pathMatch: 'full'
      },
      // {
      //   path: '',
      //   loadChildren:
      //     () => import('./modules/angular-material/angular-material.module').then(m => m.AngularMaterialModule),
      //     canActivate: [RouteGaurdService],
      //     data: {
      //       expectedRole: [
      //         'admin',
      //         'user'
      //       ]
      //     } 
      // },
      { 
      path: 'dashboard', 
      loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [RouteGaurdService],
      data: {
        expectedRole: [
          'admin',
          'user'
        ]
      } 
      },
      {
        path: 'category',
        component: ManageCategoryComponent,
        canActivate: [RouteGaurdService],
        data: {
          expectedRole: ['admin']
        }
      },
      {
        path: 'product',
        component: ManageProductComponent,
        canActivate: [RouteGaurdService],
        data: {
          expectedRole: ['admin']
        }
      },
      {
        path: 'order',
        component: ManageOrderComponent,
        canActivate: [RouteGaurdService],
        data: {
          expectedRole: ['user','admin']
        }
      },
      {
        path: 'bill',
        component: ViewBillComponent,
        canActivate: [RouteGaurdService],
        data: {
          expectedRole: ['user','admin']
        }
      },
      {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouteGaurdService],
        data: {
          expectedRole: ['admin']
        }
      }
      
    ]
  },
 
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
