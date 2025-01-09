import { Availability, DayOfWeekEnum } from "./Availability"
import { User } from "./User"

export class ActivityProfile {

    id?: string
    provider?: User
    title?: string
    description?: string
    category?: string
    mainImage?: string
    maxCapacity?: number
    price?: number
    status?: ActivityProfileStatus
    availability?: Availability[]
}

export enum ActivityProfileStatus {

    DRAFT,
    PUBLISHED,
    PAUSED,
    DELETED
}