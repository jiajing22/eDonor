import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../shared/shared-zorro.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from "./navbar.component/navbar.component";
import { LandingPageComponent } from "./landing-page.component/landing-page.component";
import { DonorSiderComponent} from "./donor.component/donor.sider.component/donor.sider.component";
import { CampaignComponent } from "./campaign.component/campaign.component";

import {LayoutModule} from "../../layout/layout.module";

const COMPONENTS = [ NavbarComponent,LandingPageComponent,
                                                  DonorSiderComponent,
                                                 CampaignComponent];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    SHARED_ZORRO_MODULES,
    LayoutModule,
  ],
  exports: [
    NavbarComponent,
    DonorSiderComponent
  ],
  declarations: [...COMPONENTS]
})
export class DashboardModule {}
