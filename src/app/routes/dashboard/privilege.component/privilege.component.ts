import { Component } from '@angular/core';

@Component({
  selector: 'app-privilege-page-component',
  templateUrl: './privilege.component.html',
  styles: [
    `
      .box {
        margin: 32px 100px;
      }

      .one {
        /*margin: 0 0 4px 16px;*/
        text-align: justify;
      }

      nz-footer {
        background-color: #de2626;
        color: white;
        text-align: center;
      }
    `
  ]
})
export class PrivilegeComponent {
  constructor() {}

  list = [
    {frequency: '1 time',
      privilege: 'Free outpatient treatment and medical treatment (excluding X-ray and surgical charges) and second class wards for a period of * 4 months.'
    },
    {frequency: '2 times (within 12 months)',
      privilege: 'Free Hepatitis B preventive injection'
    },
    {frequency: '2 ~ 5 times',
      privilege: 'Free outpatient treatment and medical treatment and second class wards for a period of * 4 months.'
    },
    {frequency: '6 ~ 10 times',
      privilege: 'Free * 1 year outpatient treatment and second class medical treatment for a * 6 month period.'
    },
    {frequency: '11 ~ 15 times',
      privilege: 'Free * 2 year outpatient treatment and medical treatment and second class wards for a * 1 year period.'
    },
    {frequency: '16 ~ 20 times',
      privilege: 'Free outpatient treatment and medical treatment and second class wards for a * 2 year period.'
    },
    {frequency: '21 ~ 30 times',
      privilege: 'Free outpatient treatment and medical treatment and second class wards for a period of * 3 years.'
    },
    {frequency: '31 ~ 40 times',
      privilege: 'Free outpatient treatment and medical treatment and first class wards for a period of * 4 years.'
    },
    {frequency: '41 ~ 50 times',
      privilege: 'Free outpatient treatment and medical treatment and first class wards for a period of * 6 years.'
    },
    {frequency: 'Over 50 times (for "Whole Blood") and Over 150 times (for aferesis donors)',
      privilege: 'Free outpatient treatment and first-class medical treatment and wards for 10 years and second-class wards of life after 10 years in first-class ward.'
    },
  ];

}
