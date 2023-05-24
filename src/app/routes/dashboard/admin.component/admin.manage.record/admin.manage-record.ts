import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { DonorService } from "../../../../shared/services/donor.service";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.manage-record.html',
  styleUrls: ['./admin.manage-record.css']
})
export class AdminManageRecord implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

  }
}
