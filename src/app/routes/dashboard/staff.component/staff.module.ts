import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../../shared/shared-zorro.module";

import { StaffRoutingModule } from "./staff-routing.module";
import { StaffSearchComponent } from "./staff.search/staff.search.component";
import { StaffMainPageComponent } from "./staff.mainpage/staff.mainpage.component";
import { DashboardModule } from "../dashboard.module";
import { LayoutModule } from "../../../layout/layout.module";
import {NavbarComponent} from "../navbar.component/navbar.component";

const COMPONENTS = [StaffMainPageComponent, StaffSearchComponent];

@NgModule({
  imports: [
    SharedModule,
    StaffRoutingModule,
    SHARED_ZORRO_MODULES,
    DashboardModule,
    LayoutModule,
  ],
  exports: [

  ],
  declarations: [...COMPONENTS]
})
export class StaffModule {}
