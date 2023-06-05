import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional} from "@angular/core";
import {DA_SERVICE_TOKEN, ITokenService, SocialService} from "@delon/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DonorService} from "../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'passport-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRecoveryComponent {
  constructor(
    private fb: FormBuilder,
    private donorService: DonorService,
    private message: NzMessageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = fb.nonNullable.group({
      email: [null, [Validators.required]],
      username: [null, [Validators.required]],
    });
  }

  form: FormGroup;
  load = false;

  submit(): void {
    this.load = true;
    this.cdr.detectChanges();

    let postData ={
      userId: this.form.value.username,
      email: this.form.value.email,
    }
    this.donorService.forgetPw(postData)
      .subscribe((res:any)=>{
        if( res === 'not found'){
          setTimeout(() => {
            this.message.error("Username and Email Not match!");
            this.load= false;
            this.cdr.detectChanges();
            return;
          }, 2000);
        } else if (res === 'success'){
          setTimeout(() => {
            this.message.success("Email Sent!");
            this.load= false;
            this.cdr.detectChanges();
            this.router.navigate(['/dashboard/login']);
          }, 3000);

        }
      })
  }
}
