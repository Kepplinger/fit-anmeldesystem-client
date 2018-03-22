import { Component } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'fit-booking-csv-export',
  templateUrl: './booking-csv-export.component.html',
  styleUrls: ['./booking-csv-export.component.scss']
})
export class BookingCsvExportComponent {

  constructor(private papa: PapaParseService) {
    let csvData = '"Hello","World!"';
    let options = {
      complete: (results, file) => {
        console.log('Parsed: ', results, file);
      }
      // Add your options here
    };

    // this.papa.parse(csvData, options);

    // let data = ['hello', 'world'];
    // console.log('Unparsed: ', this.papa.unparse(data, options));
  }

}
