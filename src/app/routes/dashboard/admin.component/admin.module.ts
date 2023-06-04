import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../../shared/shared-zorro.module";

import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardModule } from "../dashboard.module";
import { LayoutModule } from "../../../layout/layout.module";
import { AdminMainPage } from "./admin.mainPage/admin.mainPage";
import { AdminManageDonor } from "./admin.manage.donor/admin.manage-donor";
import { AdminManageRecord } from "./admin.manage.record/admin.manage-record";
import { AdminSider } from "./admin.sider.component/admin.sider";
import { AdminManageBdcentre } from "./admin.manage-bdcentre/admin.manage-bdcentre";
import { AdminAccount } from "./admin.account/admin.account";
import { AdminEditProfile } from "./admin.edit-profile/admin.edit-profile";
import { AdminManageAdmin } from "./admin.manage.admin/admin.manage-admin";

const COMPONENTS =
  [AdminMainPage, AdminManageDonor, AdminManageRecord, AdminSider,
   AdminManageBdcentre, AdminAccount, AdminEditProfile, AdminManageAdmin ];

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    SHARED_ZORRO_MODULES,
    DashboardModule,
    LayoutModule,
  ],
  exports: [

  ],
  declarations: [...COMPONENTS]
})
export class AdminModule {}
