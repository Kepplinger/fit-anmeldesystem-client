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
      this.titleService.setTitle('HTL-Leonding | FIT');
    } else if (application === FitApplication.AccountManagement) {
      this.titleService.setTitle('HTL-Leonding | Konto');
    } else if (application === FitApplication.AdminTool) {
      this.titleService.setTitle('HTL-Leonding | Absleo-Admin');
    }
    this.activatedApplication = application;
  }
}
