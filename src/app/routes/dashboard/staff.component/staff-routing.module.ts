import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffSearchComponent } from "./staff.search/staff.search.component";
import { StaffMainPageComponent } from "./staff.mainpage/staff.mainpage.component";

const routes: Routes = [
  { path: '', redirectTo: 'main-page',pathMatch: 'full' },
  { path: 'main-page', component: StaffMainPageComponent },
  { path: 'staffView', component: StaffSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}
