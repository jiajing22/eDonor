import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../passport/login/login.component';
import { CampaignListComponent } from './campaign-list.component/campaign-list.component';
import { CampaignComponent } from './campaign.component/campaign.component';
import { EligibilityComponent } from './eligibility.component/eligibility.component';
import { LandingPageComponent } from './landing-page.component/landing-page.component';
import { NavbarComponent } from './navbar.component/navbar.component';
import {PrivilegeComponent} from "./privilege.component/privilege.component";

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'campaign-list', component: CampaignListComponent },
  { path: 'eligibility', component: EligibilityComponent },
  { path: 'privilege', component: PrivilegeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
