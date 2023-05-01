import {Component, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {StaffService} from "../../../../shared/services/staff.service";
import {Donor} from "../../../../shared/model/donor.model";
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-staff-search',
  templateUrl: './staff.search.component.html',
  styleUrls: ['./staff.search.component.css'],
})
export class StaffSearchComponent implements OnInit{

  constructor(
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private message:NzMessageService
  ) {
  }

  id: string="";
  donorInfo: Donor[] =[];

  search(): void {
    console.log(this.id);
    this.staffService.searchDonor(this.id)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe( (res:any)=> {
        console.log(res);
        if (res instanceof Array) {
          // If the response is an array, use it directly
          this.donorInfo = res;
        } else {
          // If the response is an object, push it into a new array
          this.donorInfo = [res];
        }
      })
  }

  ngOnInit(): void {
    console.log('Here');

  }

}
