import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainPage } from "./admin.mainPage/admin.mainPage";
import {AdminManageDonor} from "./admin.manage.donor/admin.manage-donor";
import {AdminManageRecord} from "./admin.manage.record/admin.manage-record";
import {AdminSider} from "./admin.sider.component/admin.sider";
import {AdminManageBdcentre} from "./admin.manage-bdcentre/admin.manage-bdcentre";
import {AdminAccount} from "./admin.account/admin.account";
import {AdminEditProfile} from "./admin.edit-profile/admin.edit-profile";
import {AdminManageAdmin} from "./admin.manage.admin/admin.manage-admin";

const routes: Routes = [
  { path: '', redirectTo: 'main-page',pathMatch: 'full' },
  { path: 'main-page', component: AdminMainPage },
  { path: 'profile', component: AdminAccount },
  { path: 'edit-profile', component: AdminEditProfile },
  { path: 'manage-admin', component: AdminManageAdmin, data: { title: 'Manage Admin' } },
  { path: 'manage-donor', component: AdminManageDonor, data: { title: 'Manage Donor' } },
  { path: 'manage-record', component: AdminManageRecord, data: { title: 'Manage Record' } },
  { path: 'manage-bdcentre', component: AdminManageBdcentre, data: { title: 'Manage Centre' } },
  { path: 'sider', component: AdminSider, data: { title: 'Manage Record' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
