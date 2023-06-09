import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { LayoutModule } from '../../../layout/layout.module';
import { SHARED_ZORRO_MODULES } from '../../../shared/shared-zorro.module';
import { DashboardModule } from '../dashboard.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAccountComponent } from './admin.account/admin.account.component';
import { AdminEditProfileComponent } from './admin.edit-profile/admin.edit-profile.component';
import { AdminMainPage } from './admin.mainPage/admin.mainPage';
import { AdminManageBdcentre } from './admin.manage-bdcentre/admin.manage-bdcentre';
import { AdminManageAdminComponent } from './admin.manage.admin/admin.manage-admin.component';
import { AdminManageDonorComponent } from './admin.manage.donor/admin.manage-donor.component';
import { AdminManageRecord } from './admin.manage.record/admin.manage-record';
import { AdminManageStaffComponent } from './admin.manage.staff.component/admin.manage.staff.component';
import { AdminSiderComponent } from './admin.sider.component/admin.sider.component';

const COMPONENTS = [
  AdminMainPage,
  AdminManageDonorComponent,
  AdminManageRecord,
  AdminSiderComponent,
  AdminManageBdcentre,
  AdminAccountComponent,
  AdminEditProfileComponent,
  AdminManageAdminComponent,
  AdminManageStaffComponent
];

@NgModule({
  imports: [SharedModule, AdminRoutingModule, SHARED_ZORRO_MODULES, DashboardModule, LayoutModule],
  exports: [],
  declarations: [...COMPONENTS]
})
export class AdminModule {}
