import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorMainpage } from "./donor.mainpage/donor.mainpage";
import { DonorAccount} from "./donor.account/donor.account";
import {DonorEditProfile} from "./donor.edit-profile/donor.edit-profile";
import {DonorHistory} from "./donor.history/donor.history";

const routes: Routes = [
  { path: '', redirectTo: 'main-page',pathMatch: 'full' },
  { path: 'main-page', component: DonorMainpage },
  { path: 'donor-account', component: DonorAccount, data: { title: 'Account' } },
  { path: 'donor-edit', component: DonorEditProfile, data: { title: 'Account' } },
  { path: 'donate-history', component: DonorHistory, data: { title: 'History' } },
  // { path: 'staffAdd', component: StaffAddRecordComponent },
  // { path: 'staffPost', component: StaffNewPostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule {}
