import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {DonorService} from "../../../../shared/services/donor.service";
import {Donor} from "../../../../shared/model/donor.model";

@Component({
  selector: 'app-staff-mainpage-component',
  templateUrl: './staff.mainpage.component.html',
  styleUrls: ['./staff.mainpage.component.css']
})
export class StaffMainPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService
  ) {}
  donor: Donor[] = [];

  gridStyle = {
    width: '50%',
    textAlign: 'center',
    backgroundColor: '#0092ff',
    borderRadius: '4px',
    gridGap: '16px'
  };

  ngOnInit(): void {
    this.donorService.getDonor().subscribe((res: any) => {
      this.donor = res;
    });
  }
}
