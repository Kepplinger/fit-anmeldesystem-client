import { Component } from '@angular/core';
import { Company } from '../../../../core/model/company';

@Component({
  selector: 'fit-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {

  public companies: Company[];

  public constructor() {

  }

}
