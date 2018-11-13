import { Component, OnInit } from '@angular/core';
import { BaseAdminRoleGuardComponent } from '../../../../core/base-components/base-admin-role-guard.component';
import { UserAuthorizationService } from '../../../../core/app-services/user-authorization.service';
import { Event } from '../../../../core/model/event';
import { EventService } from '../../../../core/app-services/event.service';

@Component({
  selector: 'fit-csv-export',
  templateUrl: './csv-export.component.html',
  styleUrls: ['./csv-export.component.scss']
})
export class CsvExportComponent extends BaseAdminRoleGuardComponent implements OnInit {

  public event: Event;

  public constructor(protected userAuthorizationService: UserAuthorizationService,
                     private eventService: EventService) {
    super(userAuthorizationService);
  }

  public ngOnInit(): void {
    this.event = this.eventService.selectedEvent.getValue();
    this.addSub(this.eventService.selectedEvent.subscribe((e) => this.event = e));
  }
}
