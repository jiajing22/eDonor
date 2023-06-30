import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAccountComponent } from './admin.account/admin.account.component';
import { AdminEditProfileComponent } from './admin.edit-profile/admin.edit-profile.component';
import { AdminMainPage } from './admin.mainPage/admin.mainPage';
import { AdminManageBdcentre } from './admin.manage-bdcentre/admin.manage-bdcentre';
import { AdminManageAdminComponent } from './admin.manage.admin/admin.manage-admin.component';
import { AdminManageDonorComponent } from './admin.manage.donor/admin.manage-donor.component';
import { AdminManageRecord } from './admin.manage.record/admin.manage-record';
import { AdminManageStaffComponent } from './admin.manage.staff.component/admin.manage.staff.component';
import { AdminSiderComponent } from './admin.sider.component/admin.sider.component';

const routes: Routes = [
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: 'main-page', component: AdminMainPage },
  { path: 'profile', component: AdminAccountComponent },
  { path: 'edit-profile', component: AdminEditProfileComponent },
  { path: 'manage-admin', component: AdminManageAdminComponent, data: { title: 'Manage Admin' } },
  { path: 'manage-donor', component: AdminManageDonorComponent, data: { title: 'Manage Donor' } },
  { path: 'manage-staff', component: AdminManageStaffComponent, data: { title: 'Manage Staff' } },
  { path: 'manage-record', component: AdminManageRecord, data: { title: 'Manage Record' } },
  { path: 'manage-bdcentre', component: AdminManageBdcentre, data: { title: 'Manage Centre' } },
  { path: 'sider', component: AdminSiderComponent, data: { title: 'Manage Record' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
