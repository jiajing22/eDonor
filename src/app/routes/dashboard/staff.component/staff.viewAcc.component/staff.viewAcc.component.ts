import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-staff-view-acc-component',
  templateUrl: './staff.viewAcc.component.html',
  styleUrls: ['./staff.viewAcc.component.css']
})
export class StaffViewAccComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {
  }

}
