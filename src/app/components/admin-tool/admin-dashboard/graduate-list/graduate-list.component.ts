import { Component, OnInit } from '@angular/core';
import { Graduate } from '../../../../core/model/graduate';
import { GraduateDAO } from '../../../../core/dao/graduate.dao';
import { Address } from '../../../../core/model/address';
import { ColumnSortCriteria } from '../../../../core/app-helper/helper-model/column-sort-criteria';
import { SortHelper } from '../../../../core/app-helper/sort-helper';
import { GraduateTransferService } from '../../../../core/app-services/transfer-services/graduate-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fit-graduate-list',
  templateUrl: './graduate-list.component.html',
  styleUrls: ['./graduate-list.component.scss']
})
export class GraduateListComponent implements OnInit {

  public graduates: Graduate[];

  public loading: boolean = true;

  public constructor(private graduateDAO: GraduateDAO,
                     private graduateTransferState: GraduateTransferService,
                     private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    this.graduates = await this.graduateDAO.fetchAllGraduates();
    this.loading = false;
  }

  public onSorted(criteria: ColumnSortCriteria): void {
    this.graduates = this.graduates.sort((a, b) => SortHelper.sortHandler(a, b, criteria));
  }

  public routeToGraduateDetails(graduate: Graduate): void {
    this.graduateTransferState.addGraduate(graduate);
    this.router.navigate(['/admin-tool', 'absolvent', graduate.id]);
  }
}
