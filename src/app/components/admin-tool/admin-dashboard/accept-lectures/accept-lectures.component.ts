import {Component, OnInit} from '@angular/core';
import {CompanyDAO} from '../../../../core/dao/company.dao';
import {promise} from 'selenium-webdriver';
import {ArrayUtils} from '../../../../core/utils/array-utils';

@Component({
  selector: 'fit-accept-lectures',
  templateUrl: './accept-lectures.component.html',
  styleUrls: ['./accept-lectures.component.scss']
})
export class AcceptLecturesComponent implements OnInit {

  public listOfLectures: any[] = [];
  public listOfAccepted:any[] = [];

  public constructor(private companyDAO: CompanyDAO) {
  }

  public async ngOnInit(): Promise<void> {
     this.listOfLectures = await this.companyDAO.fetchCompaniesAndPresentations(1);
     console.log(this.listOfLectures);

  }

  public async removeLecture(entry: any): Promise<void> {
    ArrayUtils.deleteElement(this.listOfLectures, entry);
  }

  public async verifyLecture(entry: any): Promise<void> {
    ArrayUtils.deleteElement(this.listOfLectures, entry);
    this.listOfAccepted.push(entry);
  }

  public async kickLecture(entry: any): Promise<void> {
    ArrayUtils.deleteElement(this.listOfAccepted, entry);
    this.listOfLectures.push(entry);
  }


}
