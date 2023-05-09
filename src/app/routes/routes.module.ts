import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
// dashboard pages
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { RouteRoutingModule } from './routes-routing.module';
import {DashboardModule} from "./dashboard/dashboard.module";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {StaffModule} from "./dashboard/staff.component/staff.module";
import {UserRecoveryComponent} from "./passport/recovery/recovery.component";
import {ChangePasswordComponent} from "./passport/change-password/change-password.component";

const COMPONENTS: Array<Type<void>> = [
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  UserRecoveryComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  ChangePasswordComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, DashboardModule, NzRadioModule, StaffModule],
  declarations: COMPONENTS,
})
export class RoutesModule {}
