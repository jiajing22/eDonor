import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {MatchControl} from "@delon/util/form";
import {BdcentreService} from "../../../../shared/services/bdcentre.service";
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Bdcentre} from "../../../../shared/model/bdcentre.model";
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.manage-bdcentre.html',
  styleUrls: ['./admin.manage-bdcentre.css']
})
export class AdminManageBdcentre implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private bdcentreService: BdcentreService,
    private message: NzMessageService,
  ) {
  }

  error: string = '';
  list: Bdcentre[] = [];
  loading: boolean = false;
  isVisible = false;
  item: any;
  currentId:string="";
  isConfirmLoading = false;
  isUpdateLoading = false;
  isEdit = false;
  updateBloodGroupVisible = false;
  isUpdateBGLoading = false;
  selected = '';
  bloodGroups = ['A', 'B', 'AB', 'O'];
  states = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
    'Kuala Lumpur',
    'Labuan',
    'Putrajaya'
  ];

  stateOptions = this.states.map(state => ({value: state, label: state}));

  timeSlots: string[] = this.generateTimeSlots();
  timeSlotsOptions = this.timeSlots.map(timeSlots=>({value:timeSlots, label: timeSlots}));

  addNewForm = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      workStart: ['', Validators.required],
      workEnd: ['', Validators.required],
    }
  );

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.bdcentreService.getAllCentre()
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      ).subscribe((res: any) => {
      this.list = res;
      this.loading = false;
    });
  }

  generateTimeSlots(): string[] {
    const startTime = 7;
    const endTime = 22;

    const timeSlots: string[] = [];
    for (let hour = startTime; hour < endTime; hour++) {
      for (const minute of ['00', '30']) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    return timeSlots;
  }

  showModal() {
    if(!this.isEdit){
      this.addNewForm.reset();
    }
    this.isVisible = true;
  }

  showModal2(){
    this.updateBloodGroupVisible = true;
  }

  handleCancel(): void {
    this.addNewForm.reset();
    this.isVisible = false;
    this.isEdit = false;
  }

  handleCancel2(): void {
    this.updateBloodGroupVisible = false;
  }

  updateBloodGroup(){
    this.isUpdateBGLoading = true;
    let post={
      documentId: 'BG00001',
      needed: this.selected
    }
    this.bdcentreService.updateBloodGroup('BG00001',post)
      .subscribe((res:any)=>{
        if(res!=null){
          this.isUpdateBGLoading = false;
          this.message.success('Update Successfully');
          this.updateBloodGroupVisible = false;
        }
      })
  }

  handleOk(): void {
    this.error = '';
    Object.keys(this.addNewForm.controls).forEach(key => {
      const control = (this.addNewForm.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });

    if (this.addNewForm.invalid) {
      return;
    }

    let postData = {
      centreName: this.addNewForm.get('name')?.value,
      centreState: this.addNewForm.get('state')?.value,
      centrePhone: this.addNewForm.get('phone')?.value,
      cAddress: this.addNewForm.get('address')?.value,
      workHourStart: this.addNewForm.get('workStart')?.value,
      workHourEnd: this.addNewForm.get('workEnd')?.value,
    }

    if (this.isEdit) {
      this.isUpdateLoading = true;
      this.bdcentreService.updateItem(this.currentId,postData)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            return throwError(err);
          })
        ).subscribe((res: any) => {
          if(res != null){
            this.message.success("Successfully Updated");
            setTimeout(() => {
              this.isVisible = false;
              this.isUpdateLoading = false;
              this.isEdit = false;
            }, 2000);
            this.loadData();
          }

      })
    } else {
      this.isConfirmLoading = true;
      this.bdcentreService.addNew(postData)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            return throwError(err);
          })
        ).subscribe((res: any) => {
        this.message.success("Record added successfully");
        setTimeout(() => {
          this.isVisible = false;
          this.isConfirmLoading = false;
        }, 2000);
        this.loadData();
      });
    }
  }

  edit(id: string) {
    this.isVisible = true;
    this.isEdit = true;
    this.currentId = id;
    this.bdcentreService.getItem(id)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.item = res;
        this.addNewForm.patchValue({
          name: res.centreName,
          state: res.centreState,
          phone: res.centrePhone,
          address: res.cAddress,
          workStart: res.workHourStart,
          workEnd: res.workHourEnd,
        });
      });
  }

  delete(id: string) {
    this.bdcentreService.delete(id)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        setTimeout(() => {
          this.message.success(res);
        }, 2000);
        this.loadData();
      });
  }
}
