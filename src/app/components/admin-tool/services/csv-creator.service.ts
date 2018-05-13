import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Booking } from '../../../core/model/booking';
import { Company } from '../../../core/model/company';
import { Graduate } from '../../../core/model/graduate';
import { BookingDAO } from '../../../core/dao/booking.dao';
import { CompanyDAO } from '../../../core/dao/company.dao';
import { GraduateDAO } from '../../../core/dao/graduate.dao';
import * as FileSaver from 'file-saver';

@Injectable()
export class CsvCreatorService {

  public bookings: Booking[] = [];
  public companies: Company[] = [];
  public graduates: Graduate[] = [];

  public constructor(private papa: PapaParseService,
                     private bookingDAO: BookingDAO,
                     private companyDAO: CompanyDAO,
                     private graduateDAO: GraduateDAO) {
    let sessionBookings = JSON.parse(sessionStorage.getItem('csvBookings'));
    let sessionGraduates = JSON.parse(sessionStorage.getItem('csvGraduates'));
    let sessionCompanies = JSON.parse(sessionStorage.getItem('csvCompanies'));

    if (sessionBookings != null) {
      this.bookings = sessionBookings;
    }

    if (sessionGraduates != null) {
      this.bookings = sessionGraduates;
    }

    if (sessionCompanies != null) {
      this.bookings = sessionCompanies;
    }
  }

  public async loadBookings(): Promise<void> {
    this.bookings = await this.bookingDAO.fetchAllBookings();

    if (this.bookings != null) {
      sessionStorage.setItem('csvBookings', JSON.stringify(this.bookings));
    }
  }

  public async loadGraduates(): Promise<void> {
    this.graduates = await this.graduateDAO.fetchAllGraduates();

    if (this.graduates != null) {
      sessionStorage.setItem('csvGraduates', JSON.stringify(this.graduates));
    }
  }

  public async loadCompanies(): Promise<void> {
    this.companies = await this.companyDAO.fetchAllCompanies();

    if (this.companies != null) {
      sessionStorage.setItem('csvCompanies', JSON.stringify(this.companies));
    }
  }

  public getBookingCount(): number {
    if (this.bookings != null) {
      return this.bookings.length;
    } else {
      return 0;
    }
  }

  public getGraduateCount(): number {
    if (this.graduates != null) {
      return this.graduates.length;
    } else {
      return 0;
    }
  }

  public getCompanyCount(): number {
    if (this.companies != null) {
      return this.companies.length;
    } else {
      return 0;
    }
  }

  public downloadCsvFromBookings(csvFilter: any): void {

    let csvData: any[][] = [
      this.getBookingCsvHeaders(csvFilter)
    ];

    for (let booking of this.bookings) {

      let data: any[] = [ booking.id ];

      if (csvFilter.isCompanyEnabled) {
        this.addColumn(csvFilter.company.name, booking.company.name, data);
        this.addColumn(csvFilter.company.street, booking.company.address.street, data);
        this.addColumn(csvFilter.company.houseNumber, booking.company.address.streetNumber, data);
        this.addColumn(csvFilter.company.zipCode, booking.company.address.zipCode, data);
        this.addColumn(csvFilter.company.location, booking.company.address.city, data);
        this.addColumn(csvFilter.company.addition, booking.company.address.addition, data);
        this.addColumn(csvFilter.company.memberPaymentAmount, booking.company.memberPaymentAmount, data);
        this.addColumn(csvFilter.company.memberSince, booking.company.memberSince, data);
        this.addColumn(csvFilter.company.memberStatus, booking.company.memberStatus, data);
      }

      if (csvFilter.isContactEnabled) {
        this.addColumn(csvFilter.contact.gender, booking.company.contact.gender, data);
        this.addColumn(csvFilter.contact.name, booking.company.contact.firstName + '' + booking.company.contact.lastName, data);
        this.addColumn(csvFilter.contact.email, booking.company.contact.email, data);
        this.addColumn(csvFilter.contact.phone, booking.company.contact.phoneNumber, data);
      }

      if (csvFilter.isBookingEnabled) {
        this.addColumn(csvFilter.booking.branch, booking.branch, data);
        this.addColumn(csvFilter.booking.phone, booking.phoneNumber, data);
        this.addColumn(csvFilter.booking.email, booking.email, data);
        this.addColumn(csvFilter.booking.homepage, booking.homepage, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsCountAut, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsAut, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsCountInt, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsInt, data);
      }

      csvData.push(data);
    }

    let file = new Blob(
      [this.papa.unparse(csvData, {delimiter: ';', header: true})],
      {type: 'text/plain;charset=utf-8'}
    );
    FileSaver.saveAs(file, 'booking-export.csv');
  }

  public downloadCsvFromGraduates(csvFilter: any): void {
  }

  public downloadCsvFromCompanies(csvFilter: any): void {
  }

  private addColumn(condition: boolean, column: any, list: any[]): void {
    if (condition) {
      list.push(column);
    }
  }

  private getBookingCsvHeaders(csvFilter: any): any[] {

    let data: any[] = ['ID'];

    if (csvFilter.isCompanyEnabled) {
      this.addColumn(csvFilter.company.name, 'Firmenname', data);
      this.addColumn(csvFilter.company.street, 'Straße', data);
      this.addColumn(csvFilter.company.houseNumber, 'Hausnummer', data);
      this.addColumn(csvFilter.company.zipCode, 'Postleitzahl', data);
      this.addColumn(csvFilter.company.location, 'Ort', data);
      this.addColumn(csvFilter.company.addition, 'Adresszusatz', data);
      this.addColumn(csvFilter.company.memberPaymentAmount, 'Mitgliedsbeitrag', data);
      this.addColumn(csvFilter.company.memberSince, 'Mitglied seit', data);
      this.addColumn(csvFilter.company.memberStatus, 'Mitgliedsstatus', data);
    }

    if (csvFilter.isContactEnabled) {
      this.addColumn(csvFilter.contact.gender, 'Anrede', data);
      this.addColumn(csvFilter.contact.name, 'Kontak-Name', data);
      this.addColumn(csvFilter.contact.email, 'Kontakt-Email', data);
      this.addColumn(csvFilter.contact.phone, 'Kontakt-Telefon', data);
    }

    if (csvFilter.isBookingEnabled) {
      this.addColumn(csvFilter.booking.branch, 'Branche', data);
      this.addColumn(csvFilter.booking.phone, 'Telefon', data);
      this.addColumn(csvFilter.booking.email, 'E-Mail', data);
      this.addColumn(csvFilter.booking.homepage, 'Homepage', data);
      this.addColumn(csvFilter.booking.establishments, 'Anzahl Österreich', data);
      this.addColumn(csvFilter.booking.establishments, 'Österreich', data);
      this.addColumn(csvFilter.booking.establishments, 'Anzahl International', data);
      this.addColumn(csvFilter.booking.establishments, 'International', data);
    }

    return data;
  }
}
