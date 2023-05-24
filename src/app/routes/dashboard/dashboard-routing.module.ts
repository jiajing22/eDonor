import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NavbarComponent} from "./navbar.component/navbar.component";
import {LandingPageComponent} from "./landing-page.component/landing-page.component";
import {UserLoginComponent} from "../passport/login/login.component";
import {CampaignComponent} from "./campaign.component/campaign.component";

const routes: Routes = [
  { path: '', redirectTo: 'landing',pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent},
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'campaign', component: CampaignComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
