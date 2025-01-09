import { Component, OnInit } from "@angular/core";
import { Reservation } from "src/app/model/Reservation";
import { AuthService } from "src/app/services/auth.service";
import { userService } from "src/app/services/user.service";
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html'
})
export class ReservationsComponent implements OnInit {

    isLogged!: any
    reservations!: Reservation[]

    constructor(private authService: AuthService, private userService: userService) { }

    ngOnInit(): void {

        this.isLogged = this.authService.isUserLogin()

        if(this.isLogged) {
            this.userService.getUserReservations().subscribe((data) => {
                this.reservations = data
                this.loadData()
            })
        }
    }

    loadData() {
        const date = this.reservations
    }
}