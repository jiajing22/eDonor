import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits-page-component',
  templateUrl: './benefits.component.html',
  styles: [
    `
      .box {
        margin: 32px 100px;
      }

      .one {
        /*margin: 0 0 4px 16px;*/
        text-align: justify;
      }

      .benefit{
        text-align: justify;
        padding: 0 24px;
        margin: 12px 0;
      }

      nz-footer {
        background-color: #de2626;
        color: white;
        text-align: center;
      }
    `
  ]
})
export class BenefitsComponent {
  constructor() {}

}
