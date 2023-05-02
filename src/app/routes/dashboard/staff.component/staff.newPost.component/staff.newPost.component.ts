import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-staff-new-post-component',
  templateUrl: './staff.newPost.component.html',
  styleUrls: ['./staff.newPost.component.css']
})
export class StaffNewPostComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {
  }

}
