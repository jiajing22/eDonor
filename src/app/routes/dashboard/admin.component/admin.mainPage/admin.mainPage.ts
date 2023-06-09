import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DonorService} from "../../../../shared/services/donor.service";
import * as CryptoJS from "crypto-js";
import {messageConstant} from "../../../../shared/utils/constant";
import {AdminService} from "../../../../shared/services/admin.service";
import {RecordService} from "../../../../shared/services/record.service";
import {BdcentreService} from "../../../../shared/services/bdcentre.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.mainPage.html',
  styleUrls: ['./admin.mainPage.css']
})
export class AdminMainPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private donorService: DonorService,
    private recordService: RecordService,
    private bdcentreService: BdcentreService,
    private message: NzMessageService,
    private router: Router
  ) {}

  example: string =" ";
  username:any;
  decryptedId:any;
  newUser = 0;
  record:any[]=[];
  count = 0;
  bloodGroup ='';

  ngOnInit(): void {
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Admin') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }

    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, messageConstant.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    }
    let post = {
      documentId : this.decryptedId
    }

    this.adminService.getAdminById(post)
      .subscribe((res: any) => {
        this.username = res.username;
      });

    this.bdcentreService.getBloodGroup('BG00001')
      .subscribe((res:any)=>{
        this.bloodGroup = res.needed;
      });

    this.loadUser();
    this.loadRecord();
  }

  loadUser(){
    this.donorService.getDonor()
      .subscribe((res:any)=>{
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)

        const totalUsersCreated = res.reduce((count: number, item: any) => {
          const userCreatedDate = new Date(item.userCreatedDate.seconds * 1000);
          const createdMonth = userCreatedDate.getMonth(); // Get the month of user creation (0-indexed)

          if (createdMonth === currentMonth) {
            return count + 1; // Increment the count if the user was created in the current month
          }
          return count;
        }, 0);
         this.newUser = totalUsersCreated;
      });
  }

  loadRecord(){
    this.recordService.getAllRecord()
      .subscribe((res:any)=>{
        this.record = res;
        this.count = this.record.length;
      });
  }

}
