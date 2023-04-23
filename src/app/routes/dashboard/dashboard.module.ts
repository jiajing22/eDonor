import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from "./admin.component/admin.component";
import { StaffComponent } from "./staff.component/staff.component";
import { NavbarComponent } from "./navbar.component/navbar.component";
import { LandingPageComponent } from "./landing-page.component/landing-page.component";
import { SHARED_ZORRO_MODULES } from "../../shared/shared-zorro.module";
import {NzImageModule} from "ng-zorro-antd/image";

const COMPONENTS = [AdminComponent, StaffComponent, NavbarComponent, LandingPageComponent ];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    SHARED_ZORRO_MODULES,
  ],
  declarations: [...COMPONENTS]
})
export class DashboardModule {}
