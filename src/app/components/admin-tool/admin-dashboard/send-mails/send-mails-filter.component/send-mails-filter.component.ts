import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SendMailFilter} from '../../../../../core/app-helper/helper-model/send-mail-filter';
import {BranchDAO} from '../../../../../core/dao/branch.dao';
import {MemberStatusDAO} from '../../../../../core/dao/member-status.dao';
import {TagDAO} from '../../../../../core/dao/tag.dao';
import {EventService} from '../../../../../core/app-services/event.service';
import {Event} from '../../../../../core/model/event';
import {BaseSubscriptionComponent} from '../../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-send-mails-filter',
  templateUrl: './send-mails-filter.component.html',
  styleUrls: ['./send-mails-filter.component.scss']
})
export class SendMailsFilterComponent extends BaseSubscriptionComponent implements OnInit {

  @Input()
  public filter: SendMailFilter;

  @Output()
  public filterChange: EventEmitter<SendMailFilter> = new EventEmitter();

  public branches: any[] = [];
  public memberStati: any[] = [];
  public tags: any[] = [];

  public fitFilterHtml: string;
  public isDataLoading: boolean = true;

  private loadingPromises: Promise<void>[] = [];

  public constructor(private branchDAO: BranchDAO,
                     private eventService: EventService,
                     private memberStatusDAO: MemberStatusDAO,
                     private tagDAO: TagDAO) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.createFitFilterHtml(this.eventService.currentEvent.getValue());
    this.addSub(this.eventService.currentEvent.subscribe(e => this.createFitFilterHtml(e)));

    this.loadingPromises.push(this.loadBranches());
    this.loadingPromises.push(this.loadMemberStati());
    this.loadingPromises.push(this.loadTags());

    Promise.all(this.loadingPromises)
      .then(() => this.isDataLoading = false)
      .catch(() => this.isDataLoading = false);
  }

  public filterChanged(): void {
    this.filter.branches = this.branches.filter(b => b.checked).map(b => b.branch);
    this.filter.memberStati = this.memberStati.filter(m => m.checked).map(m => m.memberStatus);
    this.filter.tags = this.tags.filter(t => t.checked).map(t => t.tag);

    this.filterChange.emit(this.filter);
  }

  private createFitFilterHtml(event: Event): void {
    this.fitFilterHtml = `Nur mit FIT Anmeldung <span class="text-smaller text-muted">(am ` + event.eventDate.format('DD.MM.YYYY') + `)</span>`;
  }

  private async loadBranches(): Promise<void> {
    this.branches = (await this.branchDAO.fetchBranches()).map(b => {
      return {branch: b, checked: false};
    });
  }

  private async loadMemberStati(): Promise<void> {
    this.memberStati = (await this.memberStatusDAO.fetchMemberStati()).map(m => {
      return {memberStatus: m, checked: false};
    });
  }

  private async loadTags(): Promise<void> {
    this.tags = (await this.tagDAO.fetchTags()).map(t => {
      return {tag: t, checked: false};
    });
  }
}
