import { Component, OnInit } from '@angular/core';
import { PresentationDAO } from '../../../../core/dao/presentation.dao';
import { EventService } from '../../../../core/app-services/event.service';
import { CompanyPresentation } from '../../../../core/app-helper/helper-model/company-presentation';
import { IsAccepted } from '../../../../core/model/enums/is-accepted';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { ModalWindowService } from '../../../../core/app-services/modal-window.service';
import { ModalTemplateCreatorHelper } from '../../../../core/app-helper/modal-template-creator-helper';
import { ToastrService } from 'ngx-toastr';

declare let $;

@Component({
  selector: 'fit-accept-presentations',
  templateUrl: './accept-presentations.component.html',
  styleUrls: ['./accept-presentations.component.scss']
})
export class AcceptPresentationsComponent implements OnInit {

  // for template use
  public IsAccepted = IsAccepted;

  public displayedList: IsAccepted = IsAccepted.Accepted;
  public presentations: CompanyPresentation[] = [];
  public serverUrl: string;

  public constructor(private presentationDAO: PresentationDAO,
                     private eventService: EventService,
                     private toastr: ToastrService,
                     private modalWindowService: ModalWindowService,
                     private appConfig: AppConfig) {
    this.serverUrl = this.appConfig.serverURL;
  }

  public async ngOnInit(): Promise<void> {
    this.presentations = await this.presentationDAO.fetchPresentations(this.eventService.selectedEvent.getValue().id);
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
    this.toastr.success('Der Raum wurde erfolgreich geändert.', 'Raum geändert!');
  }
}
