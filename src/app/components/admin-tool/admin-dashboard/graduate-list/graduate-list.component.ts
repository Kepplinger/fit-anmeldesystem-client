import { Component, OnInit } from '@angular/core';
import { Graduate } from '../../../../core/model/graduate';
import { GraduateDao } from '../../../../core/dao/graduate.dao';
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

  public constructor(private graduateDAO: GraduateDao,
                     private graduateTransferState: GraduateTransferService,
                     private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    this.graduates = await this.graduateDAO.fetchAllGraduates();
    this.loading = false;

    this.graduates.push(new Graduate(null, 'Pautz',
      new Address('Linz', '4020', 'Feilstraße', '9', 'Addition'), 'marcel.pautz@gmail.com', '0664/3828019', 'M', 2));
    this.graduates.push(new Graduate('Felix', 'Hofmann',
      new Address('Linz', '4020', 'Am Spallerhof', '7', 'Addition'), 'fuffy.h@gmail.com', '0664/3212384', 'M', 3));
  }

  public onSorted(criteria: ColumnSortCriteria): void {
    this.graduates = this.graduates.sort((a, b) => SortHelper.sortHandler(a, b, criteria));
  }

  public routeToGraduateDetails(graduate: Graduate): void {
    this.graduateTransferState.addGraduate(graduate);
    this.router.navigate(['/admin-tool', 'absolvent', graduate.id]);
  }
}
