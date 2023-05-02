import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../../shared/shared-zorro.module";

import { StaffRoutingModule } from "./staff-routing.module";
import { StaffSearchComponent } from "./staff.search/staff.search.component";
import { StaffMainPageComponent } from "./staff.mainpage/staff.mainpage.component";
import { DashboardModule } from "../dashboard.module";
import { LayoutModule } from "../../../layout/layout.module";
import { StaffAddRecordComponent } from "./staff.addRecord.component/staff.addRecord.component";
import { StaffViewAccComponent } from "./staff.viewAcc.component/staff.viewAcc.component";
import { StaffNewPostComponent } from "./staff.newPost.component/staff.newPost.component";
import {NavbarComponent} from "../navbar.component/navbar.component";

const COMPONENTS =
    [StaffMainPageComponent, StaffSearchComponent, StaffAddRecordComponent, StaffViewAccComponent,
    StaffNewPostComponent];

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
