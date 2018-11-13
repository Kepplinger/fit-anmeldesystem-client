import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Graduate } from '../../../core/model/graduate';
import { GraduateDAO } from '../../../core/dao/graduate.dao';
import { DataUpdateNotifier } from '../../../core/app-services/data-update-notifier';

@Injectable()
export class GraduatesService {

  public graduates: BehaviorSubject<Graduate[]> = new BehaviorSubject([]);
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public constructor(private graduateDAO: GraduateDAO,
                     private dataUpdateNotifier: DataUpdateNotifier) {
    this.reloadGraduates();
    this.dataUpdateNotifier.graduateUpdated.subscribe(g => this.updateGraduate(g));
  }

  public async reloadGraduates(): Promise<void> {
    if (this.graduates.getValue().length === 0) {
      this.isLoading.next(true);
    }
    this.graduates.next(await this.graduateDAO.fetchGraduates());
    this.isLoading.next(false);
  }

  public updateGraduate(graduate: Graduate): void {
    let graduates: Graduate[] = this.graduates.getValue();
    graduates[graduates.findIndex(g => g.id === graduate.id)] = graduate;
    this.graduates.next(graduates);
  }
}
