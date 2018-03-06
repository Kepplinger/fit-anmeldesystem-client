import { Component, OnInit } from '@angular/core';
import { ChangeProtocol } from '../../../../core/model/change-protocol';
import { ChangeProtocolDAO } from '../../../../core/dao/change-protocol.dao';

@Component({
  selector: 'fit-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {

  public changelog: ChangeProtocol[];

  public constructor(private changeProtocolDAO: ChangeProtocolDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.changelog = await this.changeProtocolDAO.fetchChangeProtocol();
  }
}
