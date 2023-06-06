import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User } from '@delon/theme';
import * as CryptoJS from 'crypto-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'campaign-activities-component',
  templateUrl: './campaign.component.html',
  styles: [
    `
      .post {
        margin: auto;
        width: 740px;
      }

      .content {
        padding: 32px;
      }
    `
  ]
})
export class CampaignComponent implements OnInit {
  constructor(
    private settings: SettingsService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private postService: PostService
  ) {}

  posts: any[] = [];
  load = false;
  isStaff = false;
  show = false;
  id = '';
  updateloading = false;

  updateForm = this.fb.nonNullable.group({
    title: [null, Validators.required],
    eventDate: [null, Validators.required],
    location: [null, Validators.required],
    description: [null, [Validators.required, Validators.maxLength(2000)]]
  });

  ngOnInit() {
    this.loadData();
    let sessionItem = sessionStorage.getItem('userType');
    if (sessionItem) {
      if (sessionItem === 'Staff') {
        this.isStaff = true;
      }
    } else {
      console.log('Encrypted message not found.');
    }
  }

  formatTimestamp(timestamp: any): string {
    if (timestamp != null) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    }
    return '-';
  }

  more(data: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };

    this.router.navigate(['/dashboard/campaign-list'], navigationExtras);
  }

  edit(data: any) {
    this.show = true;
    this.id = data.campaignId;
    this.updateForm.patchValue(data);
  }

  loadData() {
    this.load = true;
    this.postService.getAll().subscribe((res: any) => {
      this.posts = res;
      this.load = false;
    });
  }

  update() {
    this.updateloading = true;
    let post = {
      ...this.updateForm.value,
      eventDate: this.translateDate(this.updateForm.get('eventDate') as FormControl),
      campaignId: this.id
    };
    this.postService.updatePost(post).subscribe((res: any) => {
      if (res === null) {
        this.message.error('Error when updating post');
        return;
      }
      setTimeout(() => {
        this.updateloading = false;
        this.show = false;
        this.loadData();
      }, 2000);
    });
    console.log(post);
  }

  cancel() {
    this.show = false;
  }

  translateDate(date: FormControl<any>): string {
    const selectedDate: Date | string | null = date.value;

    if (typeof selectedDate === 'string') {
      return selectedDate; // Return the original value
    }

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

  isDisabledDate = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    return current < today;
  };
}
