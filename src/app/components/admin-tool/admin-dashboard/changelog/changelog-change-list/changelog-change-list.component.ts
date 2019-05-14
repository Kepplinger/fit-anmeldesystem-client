import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeProtocol } from '../../../../../core/model/change-protocol';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { ChangeProtocolDAO } from '../../../../../core/dao/change-protocol.dao';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'fit-changelog-change-list',
  templateUrl: './changelog-change-list.component.html',
  styleUrls: ['./changelog-change-list.component.scss']
})
export class ChangelogChangeListComponent implements OnInit {

  @Input()
  public changelog: ChangeProtocol[] = [];

  @Input()
  public openedChange: ChangeProtocol = new ChangeProtocol();

  @Output()
  public openedChangeChange: EventEmitter<ChangeProtocol> = new EventEmitter<ChangeProtocol>();

  public constructor(private changeProtocolDAO: ChangeProtocolDAO,
                     private companiesService: CompaniesService) {
  }

  public ngOnInit(): void {
  }

  public emitOpenedChange(change: ChangeProtocol): void {
    if (this.openedChange === change) {
      change = null;
    }
    this.openedChange = change;
    this.openedChangeChange.emit(change);
  }

  public async applyChange(change: ChangeProtocol): Promise<void> {
    let newChange = await this.changeProtocolDAO.applyChangeProtocol(change);
    ArrayUtils.replaceElement(change, newChange, this.changelog);
  }

  public async revertChange(change: ChangeProtocol): Promise<void> {
    let newChange = await this.changeProtocolDAO.revertChangeProtocol(change);
    ArrayUtils.replaceElement(change, newChange, this.changelog);

    // reload all data to prevent optimistic locking failure
    this.companiesService.reloadCompanies();
  }
}
