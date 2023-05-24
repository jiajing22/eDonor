import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainPage } from "./admin.mainPage/admin.mainPage";
import {AdminManageDonor} from "./admin.manage.donor/admin.manage-donor";
import {AdminManageRecord} from "./admin.manage.record/admin.manage-record";
import {AdminSider} from "./admin.sider.component/admin.sider";
import {AdminManageBdcentre} from "./admin.manage-bdcentre/admin.manage-bdcentre";

const routes: Routes = [
  { path: '', redirectTo: 'main-page',pathMatch: 'full' },
  { path: 'main-page', component: AdminMainPage },
  { path: 'manage-donor', component: AdminManageDonor, data: { title: 'Manage Donor' } },
  { path: 'manage-record', component: AdminManageRecord, data: { title: 'Manage Record' } },
  { path: 'manage-bdcentre', component: AdminManageBdcentre, data: { title: 'Manage Centre' } },
  { path: 'sider', component: AdminSider, data: { title: 'Manage Record' } },
  // { path: 'donor-edit', component: DonorEditProfile, data: { title: 'Account' } },
  // { path: 'donate-history', component: DonorHistory, data: { title: 'History' } },
  // { path: 'staffAdd', component: StaffAddRecordComponent },
  // { path: 'staffPost', component: StaffNewPostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
