import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {RegistrationService} from "../../../../shared/services/registration.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-staff-add-record-component',
  templateUrl: './staff.manageForm.component.html',
  styleUrls: ['./staff.manageForm.component.css']
})
export class StaffManageFormComponent implements OnInit{
  questionnaires!: FormGroup;
  formControlNames = [
    'q1', 'q2', 'q3', 'q3a', 'q3a1', 'q4a', 'q4a1','q4b', 'q4c', 'q4d', 'q4d1', 'q5a', 'q5b', 'q5c', 'q5d' ,
    'q5e', 'q5f', 'q5g', 'q5h', 'q5i', 'q5j', 'q5k', 'q5l', 'q5m', 'q5n','q5n1','q6', 'q6a1', 'q7a', 'q7b', 'q7c',
    'q8', 'q8a1', 'q9', 'q10', 'q11', 'q12a', 'q12b', 'q12c', 'q12d', 'q13a', 'q13b', 'q13c','q14a', 'q14b', 'q14c', 'q14d',
    'q14e', 'q14f', 'q14g', 'q14h', 'q14i', 'q15a', 'q15b','q15c','q15d','t1','t2', 't3','t4',
  ];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private registrationService: RegistrationService,
    private message: NzMessageService,
  ) {
  }

  isLoading= false;
  error: string = "";
  decryptedId: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  dataForm: any[] = [];
  currentPage = 1;
  item:any;
  isVisible=false;

  regForm = this.fb.nonNullable.group({
    name: ['',[Validators.required, Validators.pattern(/^[A-Za-z' ]+$/)]],
    ic: ['',[Validators.required, Validators.pattern(/^\d{12}$/)]],
    dob: ['',Validators.required],
    age: [null,Validators.required],
    ethnic: [null,Validators.required],
    maritial: [null,Validators.required],
    occupation: ['',Validators.required],
    homeTel: [null],
    hpTel: [null,Validators.required],
    currentAd: [null,Validators.required],
    state: [null,Validators.required],
    postcode: [null,[Validators.required, Validators.pattern(/^\d{5}$/)]],
  })

  ngOnInit() {
    this.loadData();
    const formControlsConfig: { [key: string]: any } = this.formControlNames.reduce((config: { [key: string]: any }, controlName: string) => {
      if (controlName === 't1' || controlName === 't2' || controlName === 't3' || controlName === 't4') {
        config[controlName] = [null, Validators.required];
      } else {
        config[controlName] = null;
      }
      return config;
    }, {});

    this.questionnaires = this.fb.group(formControlsConfig);
  }

  loadData(){
    this.isLoading= true;
    this.registrationService.getAllFormList()
      .subscribe((res:any)=>{
        this.dataForm = res;
        console.log(res);
        this.dataForm.sort((a: any, b: any) => {
          const submitTimeA = new Date(0);
          submitTimeA.setUTCSeconds(a.regForm.submitTime.seconds);
          submitTimeA.setUTCMilliseconds(a.regForm.submitTime.nanos / 1000000);

          const submitTimeB = new Date(0);
          submitTimeB.setUTCSeconds(b.regForm.submitTime.seconds);
          submitTimeB.setUTCMilliseconds(b.regForm.submitTime.nanos / 1000000);

          return submitTimeB.getTime() - submitTimeA.getTime();
        });
        this.isLoading= false;
      });
  }

  formatTimestamp(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  getStatusColor(status: string): string {
    const colorMap: { [status: string]: string } = {
      submitted: 'processing',
      checked: 'success',
      rejected: 'error',
      expired: 'default'
    };
    return colorMap[status] || 'default';
  }

  cancel(): void {
    this.message.info('click cancel');
  }

  confirm(data:any, status:string): void {
    let postData = {
      documentId: data.documentId,
      formStatus: status
    };
    this.registrationService.updateStatus(postData)
      .subscribe((res)=>{
        if (res == null){
          this.message.error("Status fail to update");
        }
        this.message.success('Status updated!');
        this.loadData();
      })
  }

  isSubmitted(status: string): boolean {
    return status === 'submitted';
  }

  beforeConfirm(): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 2000);
    });
  }

  viewData(data:any){
    this.regForm.patchValue(data.regForm);
    this.item = data.formFields;
    this.currentPage =2;
  }

  previousPage(){
    this.currentPage--;
  }

  nextPage(item:any){
    this.questionnaires.patchValue(item)
    this.currentPage = 3;
  }
}
