import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Event } from '../../../../core/model/event';
import { EventDAO } from '../../../../core/dao/event.dao';
import { IsAccepted } from '../../../../core/model/enums/is-accepted';
import { PresentationDAO } from '../../../../core/dao/presentation.dao';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { EventService } from '../../../../core/app-services/event.service';
import { ModalWindowService } from '../../../../core/app-services/modal-window.service';
import { CompanyPresentation } from '../../../../core/app-helper/helper-model/company-presentation';
import { ModalTemplateCreatorHelper } from '../../../../core/app-helper/modal-template-creator-helper';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';
import { PresentationsService } from '../../services/presentations.service';

@Component({
  selector: 'fit-accept-presentations',
  templateUrl: './accept-presentations.component.html',
  styleUrls: ['./accept-presentations.component.scss']
})
export class AcceptPresentationsComponent extends BaseSubscriptionComponent implements OnInit {

  // for template use
  public IsAccepted = IsAccepted;

  public displayedList: IsAccepted = IsAccepted.Accepted;
  public presentations: CompanyPresentation[] = [];
  public serverUrl: string;

  public openedPresentation: CompanyPresentation = null;
  public presentationLocked: boolean = false;
  public isLoading: boolean = false;

  public constructor(private presentationsService: PresentationsService,
                     private presentationDAO: PresentationDAO,
                     private eventDAO: EventDAO,
                     private eventService: EventService,
                     private toastr: ToastrService,
                     private modalWindowService: ModalWindowService,
                     private appConfig: AppConfig) {
    super();
    this.serverUrl = this.appConfig.serverURL;
  }

  public async ngOnInit(): Promise<void> {
    this.presentationLocked = this.eventService.selectedEvent.getValue().presentationsLocked;
    this.presentations = this.presentationsService.presentations.getValue();
    this.presentationsService.reloadPresentations();

    this.isLoading = this.presentationsService.isLoading.getValue();
    this.addSub(this.presentationsService.isLoading.subscribe(l => this.isLoading = l));

    this.addSub(this.presentationsService.presentations.subscribe(p => this.presentations = p));
    this.addSub(this.eventService.selectedEvent.subscribe((event: Event) => {
      this.presentationLocked = event.presentationsLocked;
    }));

  }

  public getPresentations(): CompanyPresentation[] {
    switch (this.displayedList) {
      case IsAccepted.Accepted:
        return this.presentations.filter(p => p.presentation.isAccepted === IsAccepted.Accepted);
      case IsAccepted.Pending:
        return this.presentations.filter(p => p.presentation.isAccepted === IsAccepted.Pending);
      case IsAccepted.Rejected:
        return this.presentations.filter(p => p.presentation.isAccepted === IsAccepted.Rejected);
      default:
        return [];
    }
  }

  public getListCount(status: IsAccepted): number {
    return this.presentations.filter(p => p.presentation.isAccepted === status).length;
  }

  public async acceptPresentation(presentation: CompanyPresentation): Promise<void> {
    let result: boolean = await this.modalWindowService.confirm(
      'Vortrag bestätigen',
      `Sind sie sicher dass Sie den <span class="text-success">Vortrag bestätigen</span> wollen?`,
      ModalTemplateCreatorHelper.getBasicModalOptions('Bestätigen', 'Abbrechen')
    );

    if (result) {
      presentation.presentation = await this.presentationDAO.acceptPresentation(presentation.presentation, IsAccepted.Accepted);
      this.presentationsService.updatePresentation(presentation);
      this.toastr.success('Der Vortrag wurde erfolgreich bestätigt.', 'Erfolgreich!');
    }
  }

  public async rejectPresentation(presentation: CompanyPresentation): Promise<void> {
    let result: boolean = await this.modalWindowService.confirm(
      'Vortrag ablehnen',
      `Sind sie sicher dass Sie den <span class="text-danger">Vortrag ablehnen</span> wollen?`,
      ModalTemplateCreatorHelper.getBasicModalOptions('Vortrag ablehnen', 'Abbrechen')
    );

    if (result) {
      presentation.presentation = await this.presentationDAO.acceptPresentation(presentation.presentation, IsAccepted.Rejected);
      this.presentationsService.updatePresentation(presentation);
      this.toastr.info('Der Vortrag wurde abgelehnt.', 'Abgelehnt!');
    }
  }

  public async editRoomNumber(presentation: CompanyPresentation): Promise<void> {
    presentation.presentation.roomNumber = await this.modalWindowService.prompt(
      'Raumnummer',
      'Geben Sie in das untere Feld die Raumnummer ein, in der der Vortrag gehalten werden soll.',
      presentation.presentation.roomNumber,
      ModalTemplateCreatorHelper.getBasicModalOptions('Speichern', 'Abbrechen')
    );
    presentation.presentation = await this.presentationDAO.updatePresentation(presentation.presentation);
    this.presentationsService.updatePresentation(presentation);
    this.toastr.success('Der Raum wurde erfolgreich geändert.', 'Raum geändert!');
  }

  public async setPresentationsOpen(): Promise<void> {
    if (this.presentationLocked) {
      this.updatePresentationLock(false);
    }
  }

  public async setPresentationsLocked(): Promise<void> {
    if (!this.presentationLocked) {
      let result: boolean = await this.modalWindowService.confirm(
        'Präsentationen sperren?',
        `Wollen sie wirklich die <span class="text-danger">Präsentationen sperren</span>?`,
        ModalTemplateCreatorHelper.getBasicModalOptions('Sperren', 'Abbrechen')
      );

      if (result) {
        this.updatePresentationLock(true);
      }
    }
  }

  private async updatePresentationLock(presentationLocked: boolean) {
    this.presentationLocked = presentationLocked;
    let event = this.eventService.selectedEvent.getValue();
    let response: any = await this.eventDAO.updatePresentationLock(event, presentationLocked);

    if (response instanceof Event) {
      this.eventService.selectedEvent.next(response as Event);

      if (response.registrationState.isCurrent) {
        this.eventService.currentEvent.next(response as Event);
      }
    }
  }
}
