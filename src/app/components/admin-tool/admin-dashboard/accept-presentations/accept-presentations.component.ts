import { Component, OnInit } from '@angular/core';
import { PresentationDAO } from '../../../../core/dao/presentation.dao';
import { EventService } from '../../../../core/app-services/event.service';
import { CompanyPresentation } from '../../../../core/app-helper/helper-model/company-presentation';
import { IsAccepted } from '../../../../core/model/enums/is-accepted';

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

  public constructor(private presentationDAO: PresentationDAO,
                     private eventService: EventService) {
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
}
