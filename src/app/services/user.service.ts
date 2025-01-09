import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { User } from "../model/User";
import { Reservation } from "../model/Reservation";

@Injectable({
    providedIn: 'root'
})
export class userService {

    constructor(private apiService: ApiService) { }

    getUserInfo(): Observable<User> {
        return this.apiService.getUserInfo();
    }

    getUserReservations(): Observable<Reservation[]> {
        return this.apiService.getUserReservations();
    }
}