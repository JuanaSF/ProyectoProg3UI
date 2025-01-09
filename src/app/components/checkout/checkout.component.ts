import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Attendee } from "src/app/model/Attendee";
import { User } from "src/app/model/User";
import { AuthService } from "src/app/services/auth.service";
import { ReservationService } from "src/app/services/reservation.service";
import { SharedDataService } from "src/app/services/shared-data.service";
import { userService } from "src/app/services/user.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html'
})
export class CheckoutComponent {

    attendees!: []
    reservationInfo!: any
    formCheckout: FormGroup = new FormGroup({})
    isLogged!: any
    user!: any

    constructor(private sharedDataService: SharedDataService, private authService: AuthService,
        private userService: userService, private reservationService: ReservationService, private router: Router) { }

    ngOnInit(): void {

        this.isLogged = this.authService.isUserLogin()

        if (this.isLogged) {
            this.userService.getUserInfo().subscribe((data: any) => {
                this.user = data
                this.isLogged = true
            })
        }

        this.reservationInfo = this.sharedDataService.getReservationData();
        this.attendees = this.reservationInfo.attendeeTitles
        this.initForm()
    }

    initForm(): void {
        this.formCheckout = new FormGroup(
            {
                firstname: new FormControl(),
                lastname: new FormControl(),
                email: new FormControl(),
                phone: new FormControl(),
                attendees: new FormArray([])
            }
        )

        this.addAttendees();
    }

    initFormAttendee(): FormGroup {
        return new FormGroup(
            {
                firstname: new FormControl(),
                lastname: new FormControl(),
                dateOfBirth: new FormControl(),
                documentNumber: new FormControl(),
                nationality: new FormControl()
            }
        )
    }

    addAttendees(): void {
        const refAttendees = this.formCheckout.get('attendees') as FormArray

        this.attendees.forEach(attendee => refAttendees.push(this.initFormAttendee()))
    }

    getCtrl(key: string, form: FormGroup): any {
        return form.get(key)
    }

    confirmReservation(): void {
        const val = this.formCheckout.value;

        let attendeeList: Attendee[] = []

        val.attendees.forEach((attendee: any, index: number) => {
            const attendeeType = this.reservationInfo.attendeeTypeList[index]
            let a: Attendee = new Attendee(attendee.firstname, attendee.lastname,
                attendee.dateOfBirth, attendee.documentNumber, attendee.nationality, attendeeType)

            attendeeList.push(a)
        })

        this.reservationService.createReservation(this.reservationInfo.activity.id,
            this.reservationInfo.reservationDate, this.reservationInfo.price,
            val.phone, attendeeList).subscribe((data) => {

                if (data !== null) {
                    this.router.navigateByUrl("/reservations")
                } else {
                    this.router.navigateByUrl("/error-page")
                }
            })
    }
}