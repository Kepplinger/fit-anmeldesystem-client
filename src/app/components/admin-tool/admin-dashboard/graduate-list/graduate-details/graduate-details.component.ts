import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Graduate } from '../../../../../core/model/graduate';
import { GraduateTransferService } from '../../../../../core/app-services/transfer-services/graduate-transfer.service';

@Component({
  selector: 'fit-graduate-details',
  templateUrl: './graduate-details.component.html',
  styleUrls: ['./graduate-details.component.scss']
})
export class GraduateDetailsComponent implements OnInit {

  public graduate: Graduate;

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private graduateTransferService: GraduateTransferService) {
  }


  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params.id != null) {
          this.graduate = this.graduateTransferService.getGraduate(Number(params.id));
          if (this.graduate == null) {
            this.router.navigate(['/admin-tool', 'absolventen']);
          }
        }
      });
  }
}