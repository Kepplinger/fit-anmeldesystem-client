import { Injectable } from '@angular/core';
import { FitApplication } from '../model/enums/fit-application';
import { Title } from '@angular/platform-browser';

@Injectable()
export class ApplicationStateService {
  public activatedApplication: FitApplication;

  public constructor(private titleService: Title) {
  }

  public setApplicationState(application: FitApplication) {
    if (application === FitApplication.FitRegistration) {
      this.titleService.setTitle('FIT-Anmeldung');
    } else if (application === FitApplication.AccountManagement) {
      this.titleService.setTitle('Konto: HTL-Leonding');
    } else if (application === FitApplication.AdminTool) {
      this.titleService.setTitle('Absleo - Admin');
    }
    this.activatedApplication = application;
  }
}
