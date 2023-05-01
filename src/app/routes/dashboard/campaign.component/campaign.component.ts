import {Component, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {StaffService} from "../../../shared/services/staff.service";
import {Donor} from "../../../shared/model/donor.model";
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'campaign-activities-component',
  templateUrl: './campaign.component.html',
  // styleUrls: ['./staff.search.component.css'],
})
export class CampaignComponent{

  constructor(
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute,
    private message:NzMessageService
  ) {
  }

}
