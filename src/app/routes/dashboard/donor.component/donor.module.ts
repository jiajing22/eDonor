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
import { DonorRegistrationForm } from "./donor.registration-form/donor.registration-form";
import {DonorViewRegistrationForm} from "./donor.view.registration-form/donor.view.registration-form";
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS =
  [DonorMainpage, DonorAccount, DonorEditProfile, DonorHistory, DonorSiderComponent,
    DonorAppointment, DonorAppointmentHistory, DonorRegistrationForm, DonorViewRegistrationForm];

@NgModule({
  imports: [
    SharedModule,
    DonorRoutingModule,
    SHARED_ZORRO_MODULES,
    DashboardModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  exports: [

  ],
  declarations: [...COMPONENTS]
})
export class DonorModule {}
