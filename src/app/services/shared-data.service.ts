import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private reservationData: any;

    setReservationData(data: any) {
        this.reservationData = data;
    }

    getReservationData() {
        return this.reservationData;
    }

    // @Output() sendReservationInfo: EventEmitter<any> = new EventEmitter();

}