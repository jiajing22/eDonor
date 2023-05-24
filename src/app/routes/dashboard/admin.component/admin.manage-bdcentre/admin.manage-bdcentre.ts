import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { DonorService } from "../../../../shared/services/donor.service";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.manage-bdcentre.html',
  styleUrls: ['./admin.manage-bdcentre.css']
})
export class AdminManageBdcentre implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

  }
}
