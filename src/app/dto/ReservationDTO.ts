import { Attendee } from "../model/Attendee"

export class ReservationDTO {
    activityId?: string
    reservationDate?: string
    price?: number
    telephoneContact?: string
    attendees?: Attendee[]

    constructor(activityId: string, reservationDate: string, price: number,
        telephoneContact: string, attendees: Attendee[]) {
        this.activityId = activityId
        this.reservationDate = reservationDate
        this.price = price
        this.telephoneContact = telephoneContact
        this.attendees = attendees
    }
}