import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

import { LayoutModule } from '../../layout/layout.module';
import { SHARED_ZORRO_MODULES } from '../../shared/shared-zorro.module';
import { CampaignListComponent } from './campaign-list.component/campaign-list.component';
import { CampaignComponent } from './campaign.component/campaign.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EligibilityComponent } from './eligibility.component/eligibility.component';
import { RegFormComponent } from './form-component/form-component';
import { LandingPageComponent } from './landing-page.component/landing-page.component';
import { NavbarComponent } from './navbar.component/navbar.component';
import { PrivilegeComponent } from "./privilege.component/privilege.component";
import { BenefitsComponent } from "./benefits.component/benefits.component";
import { BdCentreListComponent } from "./bdCentreList.component/bdCentreList.component";

const COMPONENTS = [
  NavbarComponent,
  LandingPageComponent,
  CampaignComponent,
  RegFormComponent,
  CampaignListComponent,
  EligibilityComponent,
  PrivilegeComponent,
  BenefitsComponent,
  BdCentreListComponent
];

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, SHARED_ZORRO_MODULES, LayoutModule, ReactiveFormsModule],
  exports: [NavbarComponent, RegFormComponent],
  declarations: [...COMPONENTS]
})
export class DashboardModule {}
