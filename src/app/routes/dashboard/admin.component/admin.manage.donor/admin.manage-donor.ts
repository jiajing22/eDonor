import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { DonorService } from "../../../../shared/services/donor.service";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.manage-donor.html',
  styles: [`
    `
  ]
})
export class AdminManageDonor implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService
  ) {}

  loading  :boolean= false;
  example: string =" ";
  donor:any;

  ngOnInit(): void {
    this.loading = true;
    this.donorService.getDonor().subscribe((res: any) => {
      this.donor = res;
      this.loading = false;
    });
  }
}
