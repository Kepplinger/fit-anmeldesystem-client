import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/app-services/event.service';
import { BaseSubscriptionComponent } from '../../../core/base-components/base-subscription.component';
import { LockPage } from '../../../core/model/lock-page';
import { LockPageDAO } from '../../../core/dao/lock-page.dao';

@Component({
  selector: 'fit-registration-locked',
  templateUrl: './registration-locked.component.html',
  styleUrls: ['./registration-locked.component.scss']
})
export class RegistrationLockedComponent extends BaseSubscriptionComponent implements OnInit {

  public lockPage: LockPage;
  public isExpiredLockMode: boolean = false;

  public constructor(private eventService: EventService,
                     private lockPageDAO: LockPageDAO) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.isExpiredLockMode = this.eventService.currentEvent.getValue().isExpiredLockMode;
    this.addSub(this.eventService.currentEvent.subscribe(e => this.isExpiredLockMode = e.isExpiredLockMode));

    this.lockPage = await this.lockPageDAO.getLockPage();
  }
}
