import { Component, Input, OnInit } from '@angular/core';
import { Graduate } from '../../../../core/model/graduate';


@Component({
  selector: 'fit-graduate-overview',
  templateUrl: './graduate-overview.component.html',
  styleUrls: ['./graduate-overview.component.scss']
})
export class GraduateOverviewComponent implements OnInit {

  @Input()
  public graduate: Graduate;

  public ngOnInit(): void {
  }

}
