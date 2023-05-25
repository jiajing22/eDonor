import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../../shared/shared-zorro.module";

import { DonorRoutingModule } from "./donor-routing.module";
import { DashboardModule } from "../dashboard.module";
import { LayoutModule } from "../../../layout/layout.module";
import { DonorMainpage } from "./donor.mainpage/donor.mainpage";
import { DonorAccount } from "./donor.account/donor.account";
import { DonorEditProfile } from "./donor.edit-profile/donor.edit-profile";
import { DonorHistory } from "./donor.history/donor.history";
import { DonorSiderComponent } from "./donor.sider.component/donor.sider.component";
import { DonorAppointment } from "./donor.appointment/donor.appointment";
import { DonorAppointmentHistory } from "./donor.appointment-history/donor.appointment-history";

const COMPONENTS =
  [DonorMainpage, DonorAccount, DonorEditProfile, DonorHistory, DonorSiderComponent,
    DonorAppointment, DonorAppointmentHistory ];

@NgModule({
  imports: [
    SharedModule,
    DonorRoutingModule,
    SHARED_ZORRO_MODULES,
    DashboardModule,
    LayoutModule,
  ],
  exports: [

  ],
  declarations: [...COMPONENTS]
})
export class DonorModule {}