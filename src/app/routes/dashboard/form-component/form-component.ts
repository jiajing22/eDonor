import {Component, Input} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {messageConstant} from "../../../shared/utils/constant";

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.html',
  styles: [
    `::ng-deep .ant-row {
      display: flex;
      flex-flow: row wrap;
      margin-top: 4px;
    }

    .form{
      padding: 18px;
    }

    .card-14{
      margin-right: 15vh;
      background: #d9d9d9;
    }
    `
  ]
})
export class RegFormComponent{
  @Input() form!: FormGroup;
  @Input() regForm!: FormGroup;
  @Input() childPage!: number;
  @Input() item: any;
  @Input() isReadOnly!: boolean;
  constructor(
  ) {
  }
  protected readonly messageConstant = messageConstant;

  section123 = [
    { number: '1.',
      text: this.messageConstant.QUESTION1,
      formControlName: 'q1'},
    { number: '2.',
      text: this.messageConstant.QUESTION2,
      formControlName: 'q2'},
    { number: '3.',
      text: this.messageConstant.QUESTION3,
      formControlName: 'q3'},
  ];

  section4 = [
    { number: 'b)',
      text: this.messageConstant.QUESTION4B,
      formControlName: 'q4b'},
    { number: 'c)',
      text: this.messageConstant.QUESTION4C,
      formControlName: 'q4c'},
    { number: 'd)',
      text: this.messageConstant.QUESTION4D,
      formControlName: 'q4d'},
  ];

  section5 = [
    { text: this.messageConstant.Q5OPTION1,
      formControlName: 'q5a'},
    { text: this.messageConstant.Q5OPTION2,
      formControlName: 'q5b'},
    { text: this.messageConstant.Q5OPTION3,
      formControlName: 'q5c'},
    { text: this.messageConstant.Q5OPTION4,
      formControlName: 'q5d'},
    { text: this.messageConstant.Q5OPTION5,
      formControlName: 'q5e'},
    { text: this.messageConstant.Q5OPTION6,
      formControlName: 'q5f'},
    { text: this.messageConstant.Q5OPTION7,
      formControlName: 'q5g'},
    { text: this.messageConstant.Q5OPTION8,
      formControlName: 'q5h'},
    { text: this.messageConstant.Q5OPTION9,
      formControlName: 'q5i'},
    { text: this.messageConstant.Q5OPTION10,
      formControlName: 'q5j'},
    { text: this.messageConstant.Q5OPTION11,
      formControlName: 'q5k'},
    { text: this.messageConstant.Q5OPTION12,
      formControlName: 'q5l'},
    { text: this.messageConstant.Q5OPTION13,
      formControlName: 'q5m'},
    { text: this.messageConstant.Q5OPTION14,
      formControlName: 'q5n'}
  ];

  section7 = [
    { number: 'a)',
      text: this.messageConstant.QUESTION7A,
      formControlName: 'q7a'},
    { number: 'b)',
      text: this.messageConstant.QUESTION7B,
      formControlName: 'q7b'},
    { number: 'c)',
      text: this.messageConstant.QUESTION7C,
      formControlName: 'q7c'},
  ];

  section9 = [
    { number: '9.',
      text: this.messageConstant.QUESTION9,
      formControlName: 'q9'},
    { number: '10.',
      text: this.messageConstant.QUESTION10,
      formControlName: 'q10'},
    { number: '11.',
      text: this.messageConstant.QUESTION11,
      formControlName: 'q11'},
  ];

  section12 = [
    { number: 'a)',
      text: this.messageConstant.QUESTION12A,
      formControlName: 'q12a'},
    { number: 'b)',
      text: this.messageConstant.QUESTION12B,
      formControlName: 'q12b'},
    { number: 'c)',
      text: this.messageConstant.QUESTION12C,
      formControlName: 'q12c'},
    { number: 'd)',
      text: this.messageConstant.QUESTION12D,
      formControlName: 'q12d' },
  ];

  section13 = [
    { number: 'a)',
      text: this.messageConstant.QUESTION13A,
      formControlName: 'q13a' },
    { number: 'b)',
      text: this.messageConstant.QUESTION13B,
      formControlName: 'q13b' },
    { number: 'c)',
      text: this.messageConstant.QUESTION13C,
      formControlName: 'q13c' },
  ];

  section14 = [
    { number: 'a)',
      text: this.messageConstant.QUESTION14A,
      formControlName: 'q14a' },
    { number: 'b)',
      text: this.messageConstant.QUESTION14B,
      formControlName: 'q14b' },
    { number: 'c)',
      text: this.messageConstant.QUESTION14C,
      formControlName: 'q14c' },
    { number: 'd)',
      text: this.messageConstant.QUESTION14D,
      formControlName: 'q14d' },
    { number: 'e)',
      text: this.messageConstant.QUESTION14E,
      formControlName: 'q14e' },
    { number: 'f)',
      text: this.messageConstant.QUESTION14F,
      formControlName: 'q14f' },
    { number: 'g)',
      text: this.messageConstant.QUESTION14G,
      formControlName: 'q14g' },
    { number: 'h)',
      text: this.messageConstant.QUESTION14H,
      formControlName: 'q14h'},
    { number: 'i)',
      text: this.messageConstant.QUESTION14I,
      formControlName: 'q14i' },
  ];

  section15 = [
    { number: 'a)',
      text: this.messageConstant.QUESTION15A,
      formControlName: 'q15a' },
    { number: 'b)',
      text: this.messageConstant.QUESTION15B,
      formControlName: 'q15a'
    },
    { number: 'c)',
      text: this.messageConstant.QUESTION15C,
      formControlName: 'q15a' },
    { number: 'c)',
      text: this.messageConstant.QUESTION15D,
      formControlName: 'q15a' },
  ];

  terms = [
    { formControlName: 't1',
      text: this.messageConstant.TERM1 },
    { formControlName: 't2',
      text: this.messageConstant.TERM2 },
    { formControlName: 't3',
      text: this.messageConstant.TERM3 },
    { formControlName: 't4',
      text: this.messageConstant.TERM4 }
  ];

  ethnic = [
    {value: 'Malay'},
    {value: 'Chinese'},
    {value: 'Indian'},
    {value: 'Iban'},
    {value: 'Kadazan'},
    {value: 'Melanau'},
    {value: 'Murut'},
    {value: 'Bidayuh'},
    {value: 'Bajau'},
  ];

  maritial = [
    {value: 'Single'},
    {value: 'Married'},
    {value: 'Widowed/Divorced'}
  ];

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

  stateOptions = this.states.map(state => ({value: state}));

  isDisabledDate = (current: Date): boolean => {
    const today = new Date();
    return current > today;
  };

  ngOnInit() {
    if(this.isReadOnly){
      this.regForm?.disable();
      this.form?.disable();
    }
  }

}
