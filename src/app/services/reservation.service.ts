import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Attendee } from "../model/Attendee";
import { Observable } from "rxjs";
import { Reservation } from "../model/Reservation";
import { ReservationDTO } from "../dto/ReservationDTO";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    
    constructor(private apiService: ApiService) { }

    createReservation(id: string, reservationDate: string, price: number
        , phone: string, attendeeList: Attendee[]): Observable<Reservation> {
        const reservationDTO = new ReservationDTO(id, reservationDate, price, phone, attendeeList)
        
        return this.apiService.createReservation(reservationDTO)
    }

}