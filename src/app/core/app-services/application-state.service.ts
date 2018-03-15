import { Injectable } from '@angular/core';
import { FitApplication } from '../model/enums/fit-application';

@Injectable()
export class ApplicationStateService {
  public activatedApplication: FitApplication;
}
