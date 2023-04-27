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

const COMPONENTS: Array<Type<void>> = [
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, DashboardModule, NzRadioModule],
  declarations: COMPONENTS,
})
export class RoutesModule {}