import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../shared/shared-zorro.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from "./admin.component/admin.component";
import { NavbarComponent } from "./navbar.component/navbar.component";
import { LandingPageComponent } from "./landing-page.component/landing-page.component";
import { DonorMainPageComponent } from "./donor.mainPage.component/donor.mainPage.component";
import { DonorSiderComponent} from "./donor.sider.component/donor.sider.component";
import { CampaignComponent } from "./campaign.component/campaign.component";

import {LayoutModule} from "../../layout/layout.module";

const COMPONENTS = [AdminComponent, NavbarComponent,LandingPageComponent,
                                                 DonorMainPageComponent, DonorSiderComponent,
                                                 CampaignComponent];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    SHARED_ZORRO_MODULES,
    LayoutModule,
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [...COMPONENTS]
})
export class DashboardModule {}
