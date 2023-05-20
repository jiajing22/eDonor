import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from "../../../shared/shared-zorro.module";

import { DonorRoutingModule } from "./donor-routing.module";
import { DashboardModule } from "../dashboard.module";
import { LayoutModule } from "../../../layout/layout.module";
import { DonorMainpage } from "./donor.mainpage/donor.mainpage";
import { DonorAccount } from "./donor.account/donor.account";
import { DonorEditProfile } from "./donor.edit-profile/donor.edit-profile";

const COMPONENTS =
  [DonorMainpage, DonorAccount, DonorEditProfile ];

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
