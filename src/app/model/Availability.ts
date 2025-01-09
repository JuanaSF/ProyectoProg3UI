import { ActivityProfile } from "./ActivityProfile"

export class Availability {

    id?: string
    activityProfile?: ActivityProfile
    dayOfWeek?: DayOfWeekEnum
    hours?: string

    getNumberDayOfWeek(day: DayOfWeekEnum): number {
        return day
    }
}

export enum DayOfWeekEnum {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    SUNDAY = 0
}