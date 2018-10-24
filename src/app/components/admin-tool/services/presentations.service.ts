import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Presentation } from '../../../core/model/presentation';
import { PresentationDAO } from '../../../core/dao/presentation.dao';
import { EventService } from '../../../core/app-services/event.service';
import { CompanyPresentation } from '../../../core/app-helper/helper-model/company-presentation';

@Injectable()
export class PresentationsService {

  public presentations: BehaviorSubject<CompanyPresentation[]> = new BehaviorSubject([]);
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public constructor(private presentationDAO: PresentationDAO,
                     private eventService: EventService) {
    this.reloadPresentations();
  }

  public async reloadPresentations(): Promise<void> {
    if (this.presentations.getValue().length === 0) {
      this.isLoading.next(true);
    }
    this.presentations.next(await this.presentationDAO.fetchPresentations(this.eventService.selectedEvent.getValue().id));
    this.isLoading.next(false);
  }

  public updatePresentation(presentation: CompanyPresentation): void {
    let presentations: CompanyPresentation[] = this.presentations.getValue();
    presentations[presentations.findIndex(p => p.presentation.id === presentation.presentation.id)] = presentation;
    this.presentations.next(presentations);
  }
}
