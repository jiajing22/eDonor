import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorMainpage } from "./donor.mainpage/donor.mainpage";
import { DonorAccount} from "./donor.account/donor.account";
import {DonorEditProfile} from "./donor.edit-profile/donor.edit-profile";
import {DonorHistory} from "./donor.history/donor.history";
import {DonorAppointment} from "./donor.appointment/donor.appointment";
import {DonorAppointmentHistory} from "./donor.appointment-history/donor.appointment-history";
import {DonorRegistrationForm} from "./donor.registration-form/donor.registration-form";

const routes: Routes = [
  { path: '', redirectTo: 'main-page',pathMatch: 'full' },
  { path: 'main-page', component: DonorMainpage },
  { path: 'donor-account', component: DonorAccount, data: { title: 'Account' } },
  { path: 'donor-edit', component: DonorEditProfile, data: { title: 'Account' } },
  { path: 'donate-history', component: DonorHistory, data: { title: 'History' } },
  { path: 'appointment', component: DonorAppointment, data: { title: 'Book Appointment' }},
  { path: 'appointment-history', component: DonorAppointmentHistory, data: { title: 'Appointment History' }},
  { path: 'form', component: DonorRegistrationForm, data: { title: 'Form' }},
  // { path: 'staffPost', component: StaffNewPostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule {}
