import { Injectable } from '@angular/core';
import { DisplayedValue } from '../app-helper/helper-model/displayed-value';
import {environment} from '../../../environments/environment';

@Injectable()
export class AppConfig {
  public serverURL = environment.apiUrl;

  public publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKbUrzwXxRkUGqsDhcqK+kapW+n0n2cx\n' +
    'cyZE5nD+qsSztyfO2QxturJdlII5APC2dTid8Zl4xjoVpKc+7d0L+R8CAwEAAQ==';

  public genders: DisplayedValue[] = [
    new DisplayedValue('M', 'Herr'),
    new DisplayedValue('F', 'Frau'),
  ];
}
