import { Injectable } from '@angular/core';
import { DisplayedValue } from '../app-helper/helper-model/displayed-value';

@Injectable()
export class AppConfig {
  public serverURL = 'http://absleo.htl-leonding.ac.at:8181/api';

  public genders: DisplayedValue[] = [
    new DisplayedValue('M', 'Herr'),
    new DisplayedValue('F', 'Frau'),
  ];
}
