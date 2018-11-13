import { Component, OnInit } from '@angular/core';
import { UserAuthorizationService } from '../../../../core/app-services/user-authorization.service';
import { Router } from '@angular/router';
import { EventService } from '../../../../core/app-services/event.service';
import { Event } from '../../../../core/model/event';
import { BaseAdminRoleGuardComponent } from '../../../../core/base-components/base-admin-role-guard.component';

@Component({
  selector: 'fit-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent extends BaseAdminRoleGuardComponent implements OnInit {

  public event: Event;

  public constructor(protected userAuthorizationService: UserAuthorizationService,
                     private eventService: EventService,
                     private router: Router) {
    super(userAuthorizationService);
  }

  public ngOnInit(): void {
    this.event = this.eventService.selectedEvent.getValue();
    this.addSub(this.eventService.selectedEvent.subscribe(e => this.event = e));
  }

  public logout(): void {
    this.userAuthorizationService.logoutUser();
    this.router.navigate(['/admin-tool', 'login']);
  }

  public getUserName(): string {
    return this.userAuthorizationService.getUserName();
  }
}
