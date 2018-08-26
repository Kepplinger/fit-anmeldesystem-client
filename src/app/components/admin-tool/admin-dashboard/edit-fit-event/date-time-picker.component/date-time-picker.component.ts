import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

declare let $: any;

@Component({
  selector: 'fit-date-time-picker',
  templateUrl: 'date-time-picker.component.html',
  styleUrls: ['date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  @ViewChild('dateTimePicker')
  public dateTimePicker: ElementRef;

  @Input()
  public useTime: boolean = false;

  @Input()
  public placeholder: string = '';

  @Input()
  public date: Moment;

  @Output()
  public dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();

  public uniqueId: string = Math.random().toString(36).substr(2, 9);

  public ngOnInit() {
    $(this.dateTimePicker.nativeElement).datetimepicker({
      date: this.date.startOf('day'),
      format: this.useTime ? '' : 'DD. MMMM YYYY',
      locale: 'de-at'
    });

    $(this.dateTimePicker.nativeElement).on('change.datetimepicker', (event: any) => {
      console.log(event.date);
      this.dateChange.emit(event.date.add(1, 'day').startOf('day'));
    });
  }
}
