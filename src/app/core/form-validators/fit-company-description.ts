import {FormControl, ValidationErrors} from '@angular/forms';

export function fitCompanyDescriptionValidator(rows: number, columns: number) {

  return function (control: FormControl): ValidationErrors {

    if (control.value != null) {

      let lines: string[] = control.value.split(/\r\n|\r|\n/);
      let extraLines: number = 0;

      lines.forEach(l => {
        while (l.length > columns) {
          extraLines++;
          l = l.slice(columns, l.length);
        }
      });

      if (lines.length + extraLines > rows) {
        return {
          companyDescription: 'CompanyDescription too long'
        };
      }
    }
    return null;
  };
}

