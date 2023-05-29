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
import { StaffRecordForm } from "./staff.recordForm/staff.recordForm";
import {NavbarComponent} from "../navbar.component/navbar.component";
import { StaffSiderComponent } from "./staff.sider.component/staff.sider.component";
import { StaffManageAppComponent } from "./staff.manageApp.component/staff.manageApp.component";
import {StaffManageFormComponent} from "./staff.manageForm.component/staff.manageForm.component";

const COMPONENTS =
    [StaffMainPageComponent, StaffSearchComponent, StaffAddRecordComponent, StaffViewAccComponent,
    StaffNewPostComponent, StaffRecordForm, StaffSiderComponent, StaffManageAppComponent,
      StaffManageFormComponent ];

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
