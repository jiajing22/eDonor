import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-donor-main-page-component',
  templateUrl: './donor.mainpage.html',
  styleUrls : ['./donor.mainpage.css'],
})
export class DonorMainpage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}
  // donor: Donor[] = [];
  // example: string =" ";
  array = [1, 2, 3, 4];

  ngOnInit(): void {
  }
}
