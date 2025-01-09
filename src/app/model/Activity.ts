
export class Activity {

    id?: string
    title?: string
    description?: string
    category?: string
    mainImage?: string
    availableCapacity?: number
    price?: number
    date?: string
    status?: ActivityStatusEnum
}

export enum ActivityStatusEnum {

    PENDING,
    RESCHEDULED,
    CANCELED,
    COMPLETED
}