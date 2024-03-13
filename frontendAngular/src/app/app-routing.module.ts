import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AuthGuardGuard } from './helpers/auth-guard.guard';
import { IdeiasComponent } from './ideias/ideias.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './login/login.component';

@Injectable({providedIn: 'root'})
export class AdminGuard {
  canActivate() {
    return true;
  }
}
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'ideias',
    component: IdeiasComponent,
  },
  {
    path: 'aboutme',
    component: AboutMeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create',
    component: CreateProductComponent,
    canActivate: [AuthGuardGuard],
    data: {permitedRoles: ['d29f8f05-96af-4a72-ba65-d3e13e1d99a0']},
  
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
