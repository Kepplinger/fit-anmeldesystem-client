import { Injectable } from '@angular/core';
import { DisplayedValue } from '../app-helper/helper-model/displayed-value';

@Injectable()
export class AppConfig {
  // public serverURL = 'http://absleo.htl-leonding.ac.at:8181/api';
  // public serverURL = 'http://86.56.180.228/api';
  public serverURL = 'http://10.0.0.10:8080/api';
  // public serverURL = 'http://127.0.0.1:8080/api',
  // public serverURL = 'http://localhost:65016/api';

  public publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKbUrzwXxRkUGqsDhcqK+kapW+n0n2cx\n' +
    'cyZE5nD+qsSztyfO2QxturJdlII5APC2dTid8Zl4xjoVpKc+7d0L+R8CAwEAAQ==';

  public genders: DisplayedValue[] = [
    new DisplayedValue('M', 'Herr'),
    new DisplayedValue('F', 'Frau'),
  ];
}
