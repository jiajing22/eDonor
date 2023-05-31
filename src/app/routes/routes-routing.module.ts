import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import {WelcomeComponent} from "../pages/welcome/welcome.component";
import {LayoutBlankComponent} from "../layout/blank/blank.component";
import {StaffMainPageComponent} from "./dashboard/staff.component/staff.mainpage/staff.mainpage.component";
import {UserRecoveryComponent} from "./passport/recovery/recovery.component";
import {ChangePasswordComponent} from "./passport/change-password/change-password.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutBlankComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Welcome' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ]
  },
  {
    path: 'passport',
    component: LayoutBlankComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: 'Login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: 'Register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: 'Register Result' } },
      { path: 'lock', component: UserLockComponent, data: { title: 'Lock' } },
      { path: 'recovery', component: UserRecoveryComponent, data: { title: 'Forget Password' } },
      { path: 'reset', component: ChangePasswordComponent, data: { title: 'Reset Password' } },
    ]
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
  { path: 'donorMenu',
    component : LayoutBlankComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () => import('./dashboard/donor.component/donor-routing.module').then(m => m.DonorRoutingModule),
        data: { title: 'User Menu' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ]
  },

  { path: 'staff',
    component: LayoutBlankComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () => import('./dashboard/staff.component/staff-routing.module').then(m => m.StaffRoutingModule),
        data: { title: 'Staff Menu' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ]},
  { path: 'admin',
    component: LayoutBlankComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () => import('./dashboard/admin.component/admin-routing.module').then(m => m.AdminRoutingModule),
        data: { title: 'Admin Menu' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ]},
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
