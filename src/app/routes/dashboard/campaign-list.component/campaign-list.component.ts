import {Component, Inject, OnInit} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {NzMessageService} from "ng-zorro-antd/message";
import {PostService} from "../../../shared/services/post.service";

@Component({
  selector: 'campaign-activities-component',
  templateUrl: './campaign-list.component.html',
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
export class CampaignListComponent implements OnInit{
  data:any;

  constructor(
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute,
    private message:NzMessageService,
    private postService: PostService,
  ) {

    this.data = history.state.data;
  }

  ngOnInit() {

  }

}
