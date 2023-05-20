import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional} from "@angular/core";
import {DA_SERVICE_TOKEN, ITokenService, SocialService} from "@delon/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'passport-recovery',
  templateUrl: './change-password.component.html',
  // styleUrls: ['./recovery.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent {
  constructor(
    private fb: FormBuilder,
  ) {
    this.form = fb.nonNullable.group({
      email: [null, [Validators.required]],
      username: [null, [Validators.required]],
    });
  }

  form: FormGroup;

  submit(): void {
    console.log(this.form.value.email);
  }
}
