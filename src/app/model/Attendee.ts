import { Reservation } from "./Reservation"

export class Attendee {

    id?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: Date
    documentNumber?: string
    nationality?: string
    attendeeType?: AttendeeTypeEnum
    reservation?: Reservation

    constructor(firstName: string, lastName: string, dateOfBirth: Date,
        documentNumber: string, nationality: string, attendeeType: string) {

        this.firstName = firstName
        this.lastName = lastName
        this.dateOfBirth = dateOfBirth
        this.documentNumber = documentNumber
        this.nationality = nationality
        this.attendeeType = attendeeType as AttendeeTypeEnum
    }

}

export enum AttendeeTypeEnum {

    CHILD = "CHILD",
    ADULT = "ADULT"
}