import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GraduateTransferService } from '../../../../../core/app-services/transfer-services/graduate-transfer.service';
import { Graduate } from '../../../../../core/model/graduate';
import { GraduatesService } from '../../../services/graduates.service';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-graduate-details',
  templateUrl: './graduate-details.component.html',
  styleUrls: ['./graduate-details.component.scss']
})
export class GraduateDetailsComponent extends BaseSubscriptionComponent implements OnInit {

  public graduate: Graduate;

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private graduatesService: GraduatesService,
                     private graduateTransferService: GraduateTransferService) {
    super();
  }

  public ngOnInit(): void {
    this.addSub(this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params.id != null) {
          this.graduate = this.graduateTransferService.getGraduate(Number(params.id));
          console.log(this.graduate);
          if (this.graduate == null) {
            this.router.navigate(['/admin-tool', 'absolventen']);
          }
        }
      }
    ));
  }
}
