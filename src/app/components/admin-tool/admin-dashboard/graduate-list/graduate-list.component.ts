import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Graduate} from '../../../../core/model/graduate';
import {Subscription} from 'rxjs/Subscription';
import {GraduateDao} from '../../../../core/dao/graduate.dao';
import {EventService} from '../../../../core/app-services/event.service';
import {AppConfig} from '../../../../core/app-config/app-config.service';
import {Router} from '@angular/router';
import {SortService} from '../../../../core/app-services/sort-service.service';
import {Address} from '../../../../core/model/address';

@Component({
  selector: 'fit-graduate-list',
  templateUrl: './graduate-list.component.html',
  styleUrls: ['./graduate-list.component.scss']
})
export class GraduateListComponent implements OnInit, OnDestroy {
  @Output()
  public sorted = new EventEmitter();

  public graduatees: Graduate[];

  public loading: boolean = true;
  public tmpGraduate: Graduate[];


  private columnSortedSubscription: Subscription;

  public constructor(private graduateDAO: GraduateDao,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private router: Router,
                     private sortService: SortService) {
  }

  public async ngOnInit(): Promise<void> {
    this.graduatees = await this.graduateDAO.fetchAllGraduates();
    this.tmpGraduate = this.graduatees;
    this.loading = false;
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });

    this.graduatees.push(new Graduate("Marcel","Pautz",new Address("Linz","4020","Feilstraße","9","Addition"),"marcel.pautz@gmail.com","0664/3828019","M"));
    this.graduatees.push(new Graduate("Felix","Hofmann",new Address("Linz","4020","Am Spallerhof","7","Addition"),"fuffy.h@gmail.com","0664/3212384","M"));
  }

  public ngOnDestroy(): void {
    if (this.columnSortedSubscription != null) {
      this.columnSortedSubscription.unsubscribe();
    }
  }

  public onSorted(event: any): void {
    this.sortList(event);
  }

  private sortList($event: CustomerSearchCriteria): void {
    this.graduatees = this.getCustomers($event);
  }


  getCustomers(criteria: CustomerSearchCriteria): Graduate[] {
    var alphas: string[];
    alphas = criteria.sortColumn.split('.');
    return this.graduatees.sort((a, b) => {
        if (alphas.length == 1) {
          if (criteria.sortDirection === 'desc') {
            if (a[criteria.sortColumn] < b[criteria.sortColumn])
              return 1;
            if (a[criteria.sortColumn] == b[criteria.sortColumn])
              return 0;
            if (a[criteria.sortColumn] > b[criteria.sortColumn])
              return -1;
          }
          else {

            if (a[criteria.sortColumn] < b[criteria.sortColumn])
              return -1;
            if (a[criteria.sortColumn] == b[criteria.sortColumn])
              return 0;
            if (a[criteria.sortColumn] > b[criteria.sortColumn])
              return 1;
          }
        } else {
          if (criteria.sortDirection === 'desc') {
            if (a[alphas[0]][alphas[1]] < b[alphas[0]][alphas[1]])
              return 1;
            if (a[alphas[0]][alphas[1]] == b[alphas[0]][alphas[1]])
              return 0;
            if (a[alphas[0]][alphas[1]] > b[alphas[0]][alphas[1]])
              return -1;
          }
          else {

            if (a[alphas[0]][alphas[1]] < b[alphas[0]][alphas[1]])
              return -1;
            if (a[alphas[0]][alphas[1]] == b[alphas[0]][alphas[1]])
              return 0;
            if (a[alphas[0]][alphas[1]] > b[alphas[0]][alphas[1]])
              return 1;
          }
        }
    });
  }
}

export class CustomerSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}
