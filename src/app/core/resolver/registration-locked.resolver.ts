import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EventService } from '../app-services/event.service';
import { LockPageDAO } from '../dao/lock-page.dao';
import { LockPage } from '../model/lock-page';
import { first, take, takeWhile } from 'rxjs/operators';
import { isUndefined } from 'util';
import { Event } from '../model/event';

@Injectable()
export class RegistrationLockedResolver implements Resolve<LockPage> {

  public constructor(private eventService: EventService,
                     private lockPageDAO: LockPageDAO) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LockPage> {

    let currentEvent: Event;

    do {
      currentEvent = await this.eventService.currentEvent.pipe(first(e => e != null)).toPromise();
    } while (currentEvent == null);

    if (currentEvent.registrationState.isLocked) {
      return await this.lockPageDAO.getLockPage();
    } else {
      return null;
    }
  }
}
