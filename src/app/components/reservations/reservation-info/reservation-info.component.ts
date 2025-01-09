import { Component, Input, OnInit } from "@angular/core";
import * as dayjs from "dayjs";
import { AttendeeTypeEnum } from "src/app/model/Attendee";

@Component({
    selector: 'app-reservation-info',
    templateUrl: './reservation-info.component.html'
})
export class ReservationInfoComponent {

    @Input() reservation!: any
    reservationDate!: string
    attendeeDetail!: string

    ngOnInit() {
        const date = dayjs(this.reservation.reservationDate)
        this.reservationDate = date.format("dddd, DD MMM YYYY - HH:mm")
        let adults = 0;
        let childs = 0;

        this.reservation.attendees.forEach((attendee: any) => {
            if (attendee.attendeeType == 'ADULT') {
                adults++
            } else {
                childs++
            }
        })

        this.attendeeDetail = adults + (adults > 1 ? ' adultos' : ' adulto')

        if (childs > 0) {
            this.attendeeDetail += ", " + childs + (childs > 1 ? ' menores' : ' menor')
        }
    }
}