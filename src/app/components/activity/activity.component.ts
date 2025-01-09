import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as dayjs from "dayjs";
import { ActivityProfile } from "src/app/model/ActivityProfile";
import { AttendeeTypeEnum } from "src/app/model/Attendee";
import { ActivityProfileService } from "src/app/services/activity-profile.service";
import { ActivityService } from "src/app/services/activity.service";
import { SharedDataService } from "src/app/services/shared-data.service";


@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit {

    profile!: ActivityProfile
    profileId: any
    finalPrice!: number
    amountOfPeople: string = "1 persona"
    peopleCounter: number = 1
    adultCounter: number = 1
    childCounter: number = 0
    subAdultBtnEnabled: boolean = false
    addAdultBtnEnabled: boolean = true
    subChildBtnEnabled: boolean = false
    addChildBtnEnabled: boolean = true
    hoursInputEnabled: boolean = false
    isCollapsed: boolean = true
    isAvailable: boolean = true
    availableDays!: any[]
    availableHours!: any[]
    selectHoursValues!: string[]
    selectedDate: any
    selectedDateFormat: any
    selectedHour!: any
    activity!: any
    peopleDetail: string = "1 adulto"

    constructor(private route: ActivatedRoute, private activityProfileService: ActivityProfileService,
        private sharedDataService: SharedDataService, private router: Router, private activityService: ActivityService) { }

    ngOnInit(): void {
        this.profileId = this.route.snapshot.paramMap.get('id')

        this.activityProfileService.getActivityProfileInfo(this.profileId).subscribe((data) => {
            this.profile = data
            this.finalPrice = this.profile.price!
            this.setDays(this.profile)
        });
    }

    setDays(profile: ActivityProfile) {
        const values: any[] = []
        const days = profile.availability?.map((a: any) => {
            const loadHours = a.hours.split(",")

            switch (a.dayOfWeek) {
                case 'SUNDAY': {
                    values.push({
                        index: 0,
                        hours: loadHours
                    })
                    return 0
                }
                case 'MONDAY': {
                    values.push({
                        index: 1,
                        hours: loadHours
                    })
                    return 1
                }
                case 'TUESDAY': {
                    values.push({
                        index: 2,
                        hours: loadHours
                    })
                    return 2
                }
                case 'WEDNESDAY': {
                    values.push({
                        index: 3,
                        hours: loadHours
                    })
                    return 3
                }
                case 'THURSDAY': {
                    values.push({
                        index: 4,
                        hours: loadHours
                    })
                    return 4
                }
                case 'FRIDAY': {
                    values.push({
                        index: 5,
                        hours: loadHours
                    })
                    return 5
                }
                case 'SATURDAY': {
                    values.push({
                        index: 6,
                        hours: loadHours
                    })
                    return 6
                }
                default: { return }
            }
        })!

        this.availableDays = days
        this.availableHours = values
    }

    subtractAdult(): void {
        this.adultCounter--
        this.peopleCounter--
        this.updateFinalPrice()

        this.subAdultBtnEnabled = this.adultCounter <= 1 ? false : true
        this.amountOfPeople = (this.peopleCounter > 1) ? this.peopleCounter + " personas" : this.peopleCounter + " persona"
    }

    addAdult(): void {
        this.adultCounter++
        this.peopleCounter++
        this.updateFinalPrice()

        this.subAdultBtnEnabled = this.adultCounter <= 1 ? false : true
        this.amountOfPeople = (this.peopleCounter > 1) ? this.peopleCounter + " personas" : this.peopleCounter + " persona"
    }

    subtractChild(): void {
        this.childCounter--
        this.peopleCounter--
        this.updateFinalPrice()

        this.subChildBtnEnabled = this.childCounter <= 0 ? false : true
        this.amountOfPeople = (this.peopleCounter > 1) ? this.peopleCounter + " personas" : this.peopleCounter + " persona"
    }

    addChild(): void {
        this.childCounter++
        this.peopleCounter++
        this.updateFinalPrice()

        this.subChildBtnEnabled = this.childCounter <= 0 ? false : true
        this.amountOfPeople = (this.peopleCounter > 1) ? this.peopleCounter + " personas" : this.peopleCounter + " persona"
    }

    updateFinalPrice() {
        this.finalPrice = this.peopleCounter * this.profile.price!

        this.peopleDetail = this.adultCounter + (this.adultCounter > 1 ? ' adultos' : ' adulto')

        if (this.childCounter >= 1) {
            this.peopleDetail += ", " + this.childCounter + (this.childCounter > 1 ? ' menores' : ' menor')
        }
    }

    sendSelectedDate(value: any) {
        const index = value.day();
        const values: string[] = []
        this.availableHours.forEach((a: any) => {
            if (a.index == index) {
                a.hours.forEach((e: string) => { values.push(e) })
            }
        })

        this.selectedDateFormat = value.format('DD/MM/YYYY')
        this.selectedDate = value.format('YYYY/MM/DD')
        this.selectHoursValues = values
        this.selectedHour = this.selectHoursValues[0]
        this.hoursInputEnabled = true
        this.toggleCollapse()
        this.checkAvailability()
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed
    }

    formatNumber(num: number) {
        const str = num.toString();
        let result = '';
        str.split('').forEach((e, i) => {
            result += e;
            result += (str.length - i - 1) % 3 === 0 && i < str.length - 1 ? '.' : '';
        });
        return result;
    }

    checkAvailability() {
        const hour = parseInt(this.selectedHour.split(":")[0])
        const minutes = parseInt(this.selectedHour.split(":")[1])
        const date = dayjs(this.selectedDate).set('hour', hour).set('minute', minutes)

        // Busco la actividad por fecha y perfil
        this.activityService.findActivityByProfileAndDate(this.profileId, date.format('YYYY-MM-DDTHH:mm:ss')).subscribe((data) => {
            this.activity = data

            // reviso, si ya esta creada, reviso que tenga lugares suficientes
            // si no esta creada, esta disponible
            if (this.activity === null) {
                this.isAvailable = true
            } else {
                this.isAvailable = (this.activity.availableCapacity - this.peopleCounter) >= 0
            }
        })
    }

    onSelectHourChange() {
        this.checkAvailability()
    }

    startReservation() {

        // Consultar disponibilidad
        // si esta disponible continuar..

        if (this.activity === null) {
            const hour = parseInt(this.selectedHour.split(":")[0])
            const minutes = parseInt(this.selectedHour.split(":")[1])
            const date = dayjs(this.selectedDate).set('hour', hour).set('minute', minutes)
            this.activityService.createActivity(this.profileId, date.format('YYYY-MM-DDTHH:mm:ss')).subscribe((data) => {

                if (data !== null) {
                    this.activity = data
                    console.log(this.activity)
                    this.sendReservationData()
                } else {
                    this.router.navigateByUrl("/error-page")
                }

            })

        } else {
            this.sendReservationData()
        }
    }

    sendReservationData() {
        const attendeeTitles = []
        const attendeeTypeList = []

        for (let i = 0; this.adultCounter > i; i++) {
            attendeeTitles.push("Adulto " + (i + 1))
            attendeeTypeList.push(AttendeeTypeEnum.ADULT)
        }

        for (let i = 0; this.childCounter > i; i++) {
            attendeeTitles.push("Menor " + (i + 1))
            attendeeTypeList.push(AttendeeTypeEnum.CHILD)
        }

        const hour = parseInt(this.selectedHour.split(":")[0])
        const minutes = parseInt(this.selectedHour.split(":")[1])
        const date = dayjs(this.selectedDate).set('hour', hour).set('minute', minutes)

        this.sharedDataService.setReservationData({
            activity: this.activity,
            reservationDate: this.activity.date,
            price: this.finalPrice,
            attendeeTitles: attendeeTitles,
            attendeeTypeList: attendeeTypeList,
            attendeeDetail: this.peopleDetail,
            dateDetail: date.format("dddd, DD MMM YYYY - HH:mm")
        })

        this.router.navigateByUrl("/checkout/" + this.activity.id)
    }

}