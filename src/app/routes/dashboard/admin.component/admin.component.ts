import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {DonorService} from "../../../shared/services/donor.service";
import {Donor} from "../../../shared/model/donor.model";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.component.html',
  styles: [`
    .inner-layout {
      padding: 0 24px 24px;
    }`
  ]
})
export class AdminComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService
  ) {}
  donor: Donor[] = [];
  example: string =" ";

  ngOnInit(): void {
    this.donorService.getDonor().subscribe((res: any) => {
      console.log(res);
      this.donor = res;
      console.log(this.donor);
    });
  }
}
