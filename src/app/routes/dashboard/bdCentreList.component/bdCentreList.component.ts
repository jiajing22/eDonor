import {Component, OnInit} from '@angular/core';
import {BdcentreService} from "../../../shared/services/bdcentre.service";

@Component({
  selector: 'app-list-page-component',
  templateUrl: './bdCentreList.component.html',
  styles: [
    `
      .box {
        margin: 32px 100px;
      }

      .one {
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
export class BdCentreListComponent implements OnInit{
  constructor(
    private bdCentreService: BdcentreService
  ) {}

  list:any[]=[];
  load = false;

  ngOnInit() {
    this.load = true;
    this.bdCentreService.getAllCentre()
      .subscribe((res:any)=>{
        this.list=res;
        this.load=false;
    })
  }

}
