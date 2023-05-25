import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffSearchComponent } from "./staff.search/staff.search.component";
import { StaffMainPageComponent } from "./staff.mainpage/staff.mainpage.component";
import {StaffAddRecordComponent} from "./staff.addRecord.component/staff.addRecord.component";
import {StaffViewAccComponent} from "./staff.viewAcc.component/staff.viewAcc.component";
import {StaffNewPostComponent} from "./staff.newPost.component/staff.newPost.component";
import {StaffRecordForm} from "./staff.recordForm/staff.recordForm";

const routes: Routes = [
  { path: '', redirectTo: 'main-page',pathMatch: 'full' },
  { path: 'main-page', component: StaffMainPageComponent },
  { path: 'staffAcc', component: StaffViewAccComponent },
  { path: 'staffSearch', component: StaffSearchComponent },
  { path: 'staffAdd', component: StaffAddRecordComponent },
  { path: 'staffPost', component: StaffNewPostComponent },
  { path: 'recordForm', component: StaffRecordForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}