import {Component, Inject, OnInit} from '@angular/core';
import {SettingsService} from '@delon/theme';
import { Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";

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
  ) {

    this.data = history.state.data;
  }

  ngOnInit() {

  }

}
