import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './services/snackbar.service';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { RouteGaurdService } from './services/route-gaurd.service';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { MenuItems } from './shared/menu-items';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { CategoryComponent } from './components/category/category.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ProductComponent } from './components/product/product.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { ViewBillProductsComponent } from './components/view-bill-products/view-bill-products.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';






const ngxUiLoaderConfing :  NgxUiLoaderConfig = {
  text: "Loading....",
  textColor: 'orange',
  textPosition: 'center-center',
  pbColor: 'orange', //pbColor = ProgressBar Color
  bgsColor: 'orange', // bgsColor = BackGroundSpinner Color
  fgsColor: 'orange', //fgsColor = ForeGroundSpinner Color
  fgsType: SPINNER.rectangleBounce,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight, //pbDirection = ProgressBar Direction
  pbThickness: 5
} 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    HomeComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LogoutComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ConfirmationComponent,
    ManageOrderComponent,
    ViewBillComponent,
    ViewBillProductsComponent,
    ManageUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfing),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [
    MenuItems,
    UserService, 
    SnackbarService,
    DashboardService,
    AuthService,
    RouteGaurdService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
