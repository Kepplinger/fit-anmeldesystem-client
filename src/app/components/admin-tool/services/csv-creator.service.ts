import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Booking } from '../../../core/model/booking';
import { Company } from '../../../core/model/company';
import { Graduate } from '../../../core/model/graduate';
import { BookingDAO } from '../../../core/dao/booking.dao';
import { CompanyDAO } from '../../../core/dao/company.dao';
import { GraduateDAO } from '../../../core/dao/graduate.dao';
import { Address } from '../../../core/model/address';
import { Location } from '../../../core/model/location';
import { Branch } from '../../../core/model/branch';
import { Resource } from '../../../core/model/resource';
import { ResourceDAO } from '../../../core/dao/resource.dao';
import { BranchDAO } from '../../../core/dao/branch.dao';
import * as FileSaver from 'file-saver';

@Injectable()
export class CsvCreatorService {

  private bookings: Booking[] = [];
  private companies: Company[] = [];
  private graduates: Graduate[] = [];

  public constructor(private papa: PapaParseService,
                     private bookingDAO: BookingDAO,
                     private companyDAO: CompanyDAO,
                     private graduateDAO: GraduateDAO,
                     private resourceDAO: ResourceDAO,
                     private branchDAO: BranchDAO) {
    let sessionBookings = JSON.parse(sessionStorage.getItem('csvBookings'));
    let sessionGraduates = JSON.parse(sessionStorage.getItem('csvGraduates'));
    let sessionCompanies = JSON.parse(sessionStorage.getItem('csvCompanies'));

    if (sessionBookings != null) {
      this.bookings = sessionBookings;
    }

    if (sessionGraduates != null) {
      this.graduates = sessionGraduates;
    }

    if (sessionCompanies != null) {
      this.companies = sessionCompanies;
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
    this.companies = await this.companyDAO.fetchCompanies();

    if (this.companies != null) {
      sessionStorage.setItem('csvCompanies', JSON.stringify(this.companies));
    }
  }

  public getFilteredCompanies(tags: any[]) {
    return this.companies;
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

  public async downloadCsvFromBookings(csvFilter: any): Promise<void> {

    let branches: Branch[] = await this.branchDAO.fetchBranches();
    let resources: Resource[] = await this.resourceDAO.fetchResources();

    let csvData: any[][] = [
      await this.getBookingCsvHeaders(csvFilter)
    ];

    for (let booking of this.bookings) {

      if (booking.location == null) {
        booking.location = new Location();
      }

      let data: any[] = [booking.id];

      data = this.getCompanyCsvColumns(csvFilter, booking.company, data);

      if (csvFilter.isBookingEnabled) {
        this.addColumn(csvFilter.booking.branch, booking.branch, data);
        this.addColumn(csvFilter.booking.phone, booking.phoneNumber, data);
        this.addColumn(csvFilter.booking.email, booking.email, data);
        this.addColumn(csvFilter.booking.homepage, booking.homepage, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsCountAut, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsAut, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsCountInt, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsInt, data);
        this.addColumn(csvFilter.booking.additionalInfo, booking.additionalInfo, data);
        this.addColumn(csvFilter.booking.companyDescription, booking.companyDescription, data);
        this.addColumn(csvFilter.booking.isAccepted, booking.isAccepted, data);
        this.addColumn(csvFilter.booking.package, booking.fitPackage.name, data);
        this.addColumn(csvFilter.booking.providesThesis, booking.providesThesis, data);
        this.addColumn(csvFilter.booking.providesSummerJob, booking.providesSummerJob, data);
        this.addColumn(csvFilter.booking.contact, booking.contact.gender, data);
        this.addColumn(csvFilter.booking.contact, booking.contact.firstName + ' ' + booking.contact.lastName, data);
        this.addColumn(csvFilter.booking.contact, booking.contact.email, data);
        this.addColumn(csvFilter.booking.contact, booking.contact.phoneNumber, data);
        this.addColumn(csvFilter.booking.location, booking.location.number, data);

        if (csvFilter.booking.desiredBranches) {
          for (let branch of branches) {
            if (booking.branches.findIndex(b => b.id === branch.id) !== -1) {
              this.addColumn(true, 'x', data);
            } else {
              this.addColumn(true, '', data);
            }
          }
        }

        if (csvFilter.booking.resources) {
          for (let resource of resources) {
            if (booking.resources.findIndex(r => r.id === resource.id) !== -1) {
              this.addColumn(true, 'x', data);
            } else {
              this.addColumn(true, '', data);
            }
          }
        }
      }

      csvData.push(data);
    }

    this.downloadCsv(csvData, 'booking-export.csv');
  }

  public downloadCsvFromCompanies(csvFilter: any): void {
    let csvData: any[][] = [
      this.getCompanyCsvHeaders(csvFilter, true)
    ];

    for (let company of this.companies) {

      let data: any[] = [company.id];

      data = this.getCompanyCsvColumns(csvFilter, company, data);

      csvData.push(data);
    }

    this.downloadCsv(csvData, 'company-export.csv');
  }

  public downloadCsvFromGraduates(csvFilter: any): void {
    let csvData: any[][] = [
      this.getGraduateCsvHeaders(csvFilter)
    ];

    for (let graduate of this.graduates) {

      let data: any[] = [graduate.id];

      if (graduate.address == null) {
        graduate.address = new Address();
      }

      this.addColumn(csvFilter.graduate.gender, graduate.gender, data);
      this.addColumn(csvFilter.graduate.name, graduate.firstName, data);
      this.addColumn(csvFilter.graduate.name, graduate.lastName, data);
      this.addColumn(csvFilter.graduate.email, graduate.email, data);
      this.addColumn(csvFilter.graduate.phone, graduate.phoneNumber, data);
      this.addColumn(csvFilter.graduate.street, graduate.address.street, data);
      this.addColumn(csvFilter.graduate.houseNumber, graduate.address.streetNumber, data);
      this.addColumn(csvFilter.graduate.zipCode, graduate.address.zipCode, data);
      this.addColumn(csvFilter.graduate.location, graduate.address.city, data);
      this.addColumn(csvFilter.graduate.addition, graduate.address.addition, data);

      csvData.push(data);
    }

    this.downloadCsv(csvData, 'graduate-export.csv');
  }

  private addColumn(condition: boolean, column: any, list: any[]): void {
    if (condition) {
      list.push(column);
    }
  }

  private async getBookingCsvHeaders(csvFilter: any): Promise<any[]> {

    let branches: Branch[] = await this.branchDAO.fetchBranches();
    let resources: Resource[] = await this.resourceDAO.fetchResources();

    let data: any[] = ['ID'];

    data = [...data, ...this.getCompanyCsvHeaders(csvFilter, false)];

    if (csvFilter.isBookingEnabled) {
      this.addColumn(csvFilter.booking.branch, 'Branche', data);
      this.addColumn(csvFilter.booking.phone, 'Telefon', data);
      this.addColumn(csvFilter.booking.email, 'E-Mail', data);
      this.addColumn(csvFilter.booking.homepage, 'Homepage', data);
      this.addColumn(csvFilter.booking.establishments, 'Anzahl Österreich', data);
      this.addColumn(csvFilter.booking.establishments, 'Österreich', data);
      this.addColumn(csvFilter.booking.establishments, 'Anzahl International', data);
      this.addColumn(csvFilter.booking.establishments, 'International', data);
      this.addColumn(csvFilter.booking.additionalInfo, 'Sonstige Anmerkungen', data);
      this.addColumn(csvFilter.booking.companyDescription, 'Firmenbeschreibung', data);
      this.addColumn(csvFilter.booking.isAccepted, 'Ist akzeptiert?', data);
      this.addColumn(csvFilter.booking.package, 'Paket', data);
      this.addColumn(csvFilter.booking.providesThesis, 'Vergibt Ferial', data);
      this.addColumn(csvFilter.booking.providesSummerJob, 'Vergibt Diplomarbeit', data);
      this.addColumn(csvFilter.booking.contact, 'Anrede', data);
      this.addColumn(csvFilter.booking.contact, '(FIT-Kontakt) Name', data);
      this.addColumn(csvFilter.booking.contact, '(FIT-Kontakt) E-Mail', data);
      this.addColumn(csvFilter.booking.contact, '(FIT-Kontakt) Telefon', data);
      this.addColumn(csvFilter.booking.location, 'Standplatz', data);

      if (csvFilter.booking.desiredBranches) {
        branches.forEach(b => this.addColumn(true, b.name, data));
      }

      if (csvFilter.booking.resources) {
        resources.forEach(r => this.addColumn(true, r.name, data));
      }
    }

    return data;
  }

  private getCompanyCsvHeaders(csvFilter: any, useId: boolean): any[] {

    let data: any[] = [];

    if (useId) {
      data.push(['ID']);
    }

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

    return data;
  }

  private getGraduateCsvHeaders(csvFilter: any): any[] {

    let data: any[] = ['ID'];

    data = [...data, ...this.getCompanyCsvHeaders(csvFilter, false)];

    this.addColumn(csvFilter.graduate.gender, 'Anrede', data);
    this.addColumn(csvFilter.graduate.name, 'Vorname', data);
    this.addColumn(csvFilter.graduate.name, 'Nachname', data);
    this.addColumn(csvFilter.graduate.email, 'E-Mail', data);
    this.addColumn(csvFilter.graduate.phone, 'Telefonnummer', data);
    this.addColumn(csvFilter.graduate.street, 'Straße', data);
    this.addColumn(csvFilter.graduate.houseNumber, 'Hausnummer', data);
    this.addColumn(csvFilter.graduate.zipCode, 'Postleitzahl', data);
    this.addColumn(csvFilter.graduate.location, 'Ort', data);
    this.addColumn(csvFilter.graduate.addition, 'Adresszusatz', data);

    return data;
  }

  private getCompanyCsvColumns(csvFilter: any, company: Company, data: any[][]): any[][] {

    if (csvFilter.isCompanyEnabled) {
      this.addColumn(csvFilter.company.name, company.name, data);
      this.addColumn(csvFilter.company.street, company.address.street, data);
      this.addColumn(csvFilter.company.houseNumber, company.address.streetNumber, data);
      this.addColumn(csvFilter.company.zipCode, company.address.zipCode, data);
      this.addColumn(csvFilter.company.location, company.address.city, data);
      this.addColumn(csvFilter.company.addition, company.address.addition, data);
      this.addColumn(csvFilter.company.memberPaymentAmount, company.memberPaymentAmount, data);
      this.addColumn(csvFilter.company.memberSince, company.memberSince, data);
      this.addColumn(csvFilter.company.memberStatus, company.memberStatus, data);
    }

    if (csvFilter.isContactEnabled) {
      this.addColumn(csvFilter.contact.gender, company.contact.gender, data);
      this.addColumn(csvFilter.contact.name, company.contact.firstName + '' + company.contact.lastName, data);
      this.addColumn(csvFilter.contact.email, company.contact.email, data);
      this.addColumn(csvFilter.contact.phone, company.contact.phoneNumber, data);
    }

    return data;
  }

  private downloadCsv(csvData: any[][], filename: string) {
    let file = new Blob(
      [this.papa.unparse(csvData, {delimiter: ';', header: true})],
      {type: 'text/plain;charset=utf-8'}
    );
    FileSaver.saveAs(file, filename);
  }
}
