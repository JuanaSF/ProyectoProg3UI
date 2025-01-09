import { Reservation } from "./Reservation"

export class User {

    id?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    role?: RoleEnum
    deleted?: boolean
    reservations?: Reservation[]

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.role = RoleEnum.USER
    }
}

export enum RoleEnum {
    USER,
    PROVIDER,
    ADMIN
}