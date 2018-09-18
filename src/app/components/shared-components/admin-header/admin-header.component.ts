import { Component, OnInit } from '@angular/core';
import { AdminAuthorizationService } from '../../../core/app-services/admin-authorization.service';
import { Router } from '@angular/router';
import { EventService } from '../../../core/app-services/event.service';
import { Event } from '../../../core/model/event';
import { BaseAdminRoleGuardComponent } from '../../../core/base-components/base-admin-role-guard.component';

@Component({
  selector: 'fit-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent extends BaseAdminRoleGuardComponent implements OnInit {

  public event: Event;

  public constructor(protected adminAuthorizationService: AdminAuthorizationService,
                     private eventService: EventService,
                     private router: Router) {
    super(adminAuthorizationService);
  }

  public ngOnInit(): void {
    this.event = this.eventService.selectedEvent.getValue();
    this.eventService.selectedEvent.subscribe(e => this.event = e);
  }

  public logout(): void {
    this.adminAuthorizationService.logoutAdmin();
    this.router.navigate(['/admin-tool', 'login']);
  }
}
