import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

declare let $: any;

@Component({
  selector: 'fit-date-time-picker',
  templateUrl: 'date-time-picker.component.html',
  styleUrls: ['date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit, OnChanges {

  @ViewChild('dateTimePicker')
  public dateTimePicker: ElementRef;

  @Input()
  public useTime: boolean = false;

  @Input()
  public minDate: Moment = null;

  @Input()
  public maxDate: Moment = null;

  @Input()
  public placeholder: string = '';

  @Input()
  public date: Moment;

  @Output()
  public dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();

  public uniqueId: string = Math.random().toString(36).substr(2, 9);

  public ngOnChanges(changes: SimpleChanges): void {
    // if (changes['minDate'] != null) {
    //   $(this.dateTimePicker.nativeElement).datetimepicker('minDate', this.minDate);
    // }
    //
    // if (changes['maxDate'] != null) {
    //   $(this.dateTimePicker.nativeElement).datetimepicker('maxDate', this.maxDate);
    // }
  }

  public ngOnInit() {
    $(this.dateTimePicker.nativeElement).datetimepicker({
      date: this.date.startOf('day'),
      minDate: this.minDate != null ? this.minDate : false,
      maxDate: this.maxDate != null ? this.maxDate : false,
      format: this.useTime ? '' : 'L',
      locale: 'de-at'
    });

    // TODO event date incorrect
    $(this.dateTimePicker.nativeElement).on('change.datetimepicker', (event: any) => {
      this.dateChange.emit(event.date.add(1, 'day').startOf('day'));
    });
  }
}
