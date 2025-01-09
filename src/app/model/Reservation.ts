import { Activity } from "./Activity"
import { Attendee } from "./Attendee"
import { User } from "./User"

export class Reservation {

    id?: string
    client?: User
    activity?: Activity
    reservationDate?: Date
    creationDate?: Date
    price?: number
    status?: ReservationStatusEnum
    attendeeCount?: number
    attendees?: Attendee[]

}

export enum ReservationStatusEnum {
    AWAITING_CONFIRMATION = "Awaiting confirmation",
    COMPLETED = "Completed",
    NO_SHOW = "No-show",
    REJECTED = "Rejected",
    MODIFIED = "Modified",
    AWAITING_PAYMENT = "Awaiting payment",
    EXPIRED = "Expired",
    CANCELED = "Canceled",
    CONFIRMED = "Confirmed"
}