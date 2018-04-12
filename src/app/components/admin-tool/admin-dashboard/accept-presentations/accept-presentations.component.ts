import { Component, OnInit } from '@angular/core';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { PresentationDAO } from '../../../../core/dao/presentation.dao';
import { EventService } from '../../../../core/app-services/event.service';

declare let $;

@Component({
  selector: 'fit-accept-presentations',
  templateUrl: './accept-presentations.component.html',
  styleUrls: ['./accept-presentations.component.scss']
})
export class AcceptPresentationsComponent implements OnInit {

  public chosenEntry: any;
  public listOfLectures: any[] = [];
  public listOfAccepted: any[] = [];

  public constructor(private presentationDAO: PresentationDAO,
                     private eventService: EventService) {
  }

  public async ngOnInit(): Promise<void> {
    this.listOfLectures = await this.presentationDAO.fetchPresentations(this.eventService.selectedEvent.getValue().id);
  }

  public async removeLecture(entry: any): Promise<void> {
    ArrayUtils.deleteElement(this.listOfLectures, entry);
    $('#myModal').modal('hide');
  }

  public async verifyLecture(entry: any): Promise<void> {
    ArrayUtils.deleteElement(this.listOfLectures, entry);
    this.listOfAccepted.push(entry);
  }

  public async kickLecture(entry: any): Promise<void> {
    ArrayUtils.deleteElement(this.listOfAccepted, entry);
    this.listOfLectures.push(entry);
  }

  public setChosenEntry(entry: any) {
    this.chosenEntry = entry;
  }

}
