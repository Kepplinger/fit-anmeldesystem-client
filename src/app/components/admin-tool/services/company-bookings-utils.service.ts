import { Injectable } from '@angular/core';
import { Company } from '../../../core/model/company';
import { ArrayUtils } from '../../../core/utils/array-utils';
import { BookingsService } from './bookings.service';

@Injectable()
export class CompanyBookingsUtilsService {

  constructor(private bookingsService: BookingsService) {
  }

  public isReminderMailAvailable(companies: Company[]): boolean {
    if (companies.length === 1) {
      let company: Company = ArrayUtils.getFirstElement<Company>(companies);
      return this.bookingsService.bookings.getValue().filter(b => b.company.id === company.id).every(b => !b.isComplete);
    } else {
      return true;
    }
  }
}
