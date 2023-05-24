import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { DonorService } from "../../../../shared/services/donor.service";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.mainPage.html',
  styleUrls: ['./admin.mainPage.css']
})
export class AdminMainPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService
  ) {}
  // donor: Donor[] = [];
  example: string =" ";
  donor:any;

  ngOnInit(): void {
    this.donorService.getDonor().subscribe((res: any) => {
      console.log(res);
      this.donor = res;
      console.log(this.donor);
    });
  }
}
