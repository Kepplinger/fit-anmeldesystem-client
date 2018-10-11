import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LockPageDAO } from '../../../../../../core/dao/lock-page.dao';
import { LockPage } from '../../../../../../core/model/lock-page';

@Component({
  selector: 'fit-edit-locked-page',
  templateUrl: './edit-fit-locked-page.component.html',
  styleUrls: ['./edit-fit-locked-page.component.scss']
})
export class EditFitLockedPageComponent implements OnInit {

  public isExpiredLockMode: boolean = false;
  public lockPage: LockPage;

  public constructor(private route: ActivatedRoute,
                     private lockPageDAO: LockPageDAO) {
    this.route.params.subscribe(params => {
      let type: string = params['type'];

      if (type === 'bevor') {
        this.isExpiredLockMode = false;
      } else if (type === 'danach') {
        this.isExpiredLockMode = true;
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    this.lockPage = await this.lockPageDAO.getLockPage();
  }
}
