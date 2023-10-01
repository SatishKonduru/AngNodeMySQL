import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';

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
      //     () => import('./modules/angular-material/angular-material.module').then(m => m.AngularMaterialModule)
      // },
      { path: 'dashboard', 
      loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) 
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
