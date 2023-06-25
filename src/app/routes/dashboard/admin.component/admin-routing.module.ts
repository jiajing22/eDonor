import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainPage } from "./admin.mainPage/admin.mainPage";
import {AdminManageDonorComponent} from "./admin.manage.donor/admin.manage-donor.component";
import {AdminManageRecord} from "./admin.manage.record/admin.manage-record";
import {AdminSider} from "./admin.sider.component/admin.sider";
import {AdminManageBdcentre} from "./admin.manage-bdcentre/admin.manage-bdcentre";
import {AdminAccountComponent} from "./admin.account/admin.account.component";
import {AdminEditProfileComponent} from "./admin.edit-profile/admin.edit-profile.component";
import {AdminManageAdminComponent} from "./admin.manage.admin/admin.manage-admin.component";

const routes: Routes = [
  { path: '', redirectTo: 'main-page',pathMatch: 'full' },
  { path: 'main-page', component: AdminMainPage },
  { path: 'profile', component: AdminAccountComponent },
  { path: 'edit-profile', component: AdminEditProfileComponent },
  { path: 'manage-admin', component: AdminManageAdminComponent, data: { title: 'Manage Admin' } },
  { path: 'manage-donor', component: AdminManageDonorComponent, data: { title: 'Manage Donor' } },
  { path: 'manage-record', component: AdminManageRecord, data: { title: 'Manage Record' } },
  { path: 'manage-bdcentre', component: AdminManageBdcentre, data: { title: 'Manage Centre' } },
  { path: 'sider', component: AdminSider, data: { title: 'Manage Record' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
