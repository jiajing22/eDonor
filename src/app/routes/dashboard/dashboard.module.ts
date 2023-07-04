import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../shared/shared-zorro.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from "./navbar.component/navbar.component";
import { LandingPageComponent } from "./landing-page.component/landing-page.component";
import { CampaignComponent } from "./campaign.component/campaign.component";

import {LayoutModule} from "../../layout/layout.module";
import {RegFormComponent} from "./form-component/form-component";
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignListComponent } from "./campaign-list.component/campaign-list.component";
import { EligibilityComponent } from "./eligibility.component/eligibility.component";

const COMPONENTS =
  [ NavbarComponent,LandingPageComponent, CampaignComponent, RegFormComponent, CampaignListComponent, EligibilityComponent];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    SHARED_ZORRO_MODULES,
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    RegFormComponent,
  ],
  declarations: [...COMPONENTS]
})
export class DashboardModule {}
