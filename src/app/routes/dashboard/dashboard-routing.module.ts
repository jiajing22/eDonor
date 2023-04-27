import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from "./admin.component/admin.component";
import {StaffComponent} from "./staff.component/staff.component";
import {NavbarComponent} from "./navbar.component/navbar.component";
import {LandingPageComponent} from "./landing-page.component/landing-page.component";
import {UserLoginComponent} from "../passport/login/login.component";
import {DonorMainPageComponent} from "./donor.mainPage.component/donor.mainPage.component";

const routes: Routes = [
  { path: '', redirectTo: 'landing',pathMatch: 'full' },
  { path: 'adminMenu', component: AdminComponent },
  { path: 'staffMenu', component: StaffComponent },
  { path: 'landing', component: LandingPageComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'donorMenu', component: DonorMainPageComponent, data: { title: 'eDonor' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
