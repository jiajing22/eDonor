import { Component } from '@angular/core';

@Component({
  selector: 'app-eligibility-page-component',
  templateUrl: './eligibility.component.html',
  styles: [
    `
      .box {
        width: 754px;
        margin: 32px auto;
      }

      .one {
        margin: 0 0 4px 16px;
      }

      .two {
        margin: 0 0 4px 32px;
      }

      nz-footer {
        background-color: #de2626;
        color: white;
        text-align: center;
      }
    `
  ]
})
export class EligibilityComponent {
  constructor() {}
}
