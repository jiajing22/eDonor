import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PostService } from '../../../../shared/services/post.service';
import { StaffService } from '../../../../shared/services/staff.service';

@Component({
  selector: 'app-staff-new-post-component',
  templateUrl: './staff.newPost.component.html',
  styleUrls: ['./staff.newPost.component.css']
})
export class StaffNewPostComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    private staffService: StaffService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticate();
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
    } else {
      this.msg.error('You are not logged in!');
    }

    this.staffService.getStaffInfo(this.decryptedId).subscribe((res: any) => {
      this.author = res.fullName;
      this.staffId = res.userId;
    });
  }

  authenticate(){
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Staff') {
      this.msg.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }
  }

  sKey = "x^XICt8[Lp'Gm<8";
  decryptedId = '';
  author = '';
  loading = false;
  staffId = '';

  postForm = this.fb.nonNullable.group({
    title: [null, Validators.required],
    eventDate: [null, Validators.required],
    location: [null, Validators.required],
    description: [null, [Validators.required, Validators.maxLength(2000)]]
  });

  isDisabledDate = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    return current < today;
  };

  submitForm(): void {
    Object.keys(this.postForm.controls).forEach(key => {
      const control = (this.postForm.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.postForm.invalid) {
      return;
    }
    this.loading = true;
    let postData = {
      ...this.postForm.value,
      eventDate: this.translateDate(this.postForm.get('eventDate') as FormControl),
      author: this.author,
      staffId: this.staffId
    };

    this.postService.addPost(postData).subscribe((res: any) => {
      if (res) {
        this.msg.success('Post Uploaded!');
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/dashboard/campaign']);
        }, 2000);
      }
    });
  }

  translateDate(date: FormControl<any>): string {
    const selectedDate: Date | null = date.value;
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      return formattedDate;
    }
    return '';
  }
}
