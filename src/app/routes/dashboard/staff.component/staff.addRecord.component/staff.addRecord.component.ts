import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-staff-add-record-component',
  templateUrl: './staff.addRecord.component.html',
  styleUrls: ['./staff.addRecord.component.css']
})
export class StaffAddRecordComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {
  }

}
