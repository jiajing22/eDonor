import {Component, Inject, OnInit} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {NzMessageService} from "ng-zorro-antd/message";
import {PostService} from "../../../shared/services/post.service";

@Component({
  selector: 'campaign-activities-component',
  templateUrl: './campaign.component.html',
  styles: [
    `
      .post{
        margin: auto;
        width: 740px;
      }

      .content{
        padding: 32px;
      }
    `
  ],
})
export class CampaignComponent implements OnInit{

  constructor(
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute,
    private message:NzMessageService,
    private postService: PostService,
  ) {
  }

  posts: any[] = [];

  ngOnInit() {
    this.postService.getAll()
      .subscribe((res:any)=>{
        console.log(res);
        this.posts = res;
      });
  }

  formatTimestamp(timestamp: any): string {
    if(timestamp != null) {
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

  more(data:any){
    const navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };

    this.router.navigate(['/dashboard/campaign-list'], navigationExtras);
  }

}
