import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() availableDays: any
  @Output() dateSelectionEvent = new EventEmitter<any>()

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  sendSelectedDate(value: any) {
    this.dateSelectionEvent.emit(value)
  }

  monthSelect!: any[];
  dateSelect: any;
  dateValue: any;
  backButtonEnabled: boolean = false

  constructor() {

  }

  ngOnInit(): void {
    this.getDaysFromDate(dayjs().month() + 1, dayjs().year())
  }

  getDaysFromDate(month: number, year: number) {

    const startDate = dayjs(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = dayjs(`${year}-${month}-${a}`)

      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.day(),
        classStyle: this.isAvailableDay(dayObject.day()) ? 'fw-bolder' : 'pe-none opacity-50'
      };
    });

    this.monthSelect = arrayDays;
  }

  isAvailableDay(day : number): boolean {
    return this.availableDays.includes(day)
  }

  changeMonth(flag: number) {

    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }

    this.backButtonEnabled = (this.dateSelect.isBefore(dayjs())) ? false : true
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = dayjs(parse)
    this.dateValue = objectDate;
    this.sendSelectedDate(this.dateValue)
  }

}