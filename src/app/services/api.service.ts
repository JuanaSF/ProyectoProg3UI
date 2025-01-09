import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseLoginDTO } from "../dto/ResponseLoginDTO";
import { ActivityProfile } from "../model/ActivityProfile";
import { Activity } from "../model/Activity";
import { User } from "../model/User";
import { ReservationDTO } from "../dto/ReservationDTO";
import { Reservation } from "../model/Reservation";


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    _url: string = 'http://localhost:8081/api/'

    constructor(private http: HttpClient) { }

    getToken(): string | null {
        return localStorage.getItem('token') || null
    }

    getAuthHeader(): object {
        return { headers: { 'Authorization': 'Bearer ' + this.getToken() } }
    }

    login(username: string, password: string): Observable<ResponseLoginDTO> {
        return this.http.post<ResponseLoginDTO>(this._url + 'auth/login', { username: username, password: password })
    }

    signup(newUser: User): Observable<any> {
        return this.http.post<User>(this._url + 'auth/signup', newUser)
    }

    // -------------- user enpoints ------------------

    getUserInfo(): Observable<User> {
        return this.http.get<User>(this._url + "users/me", this.getAuthHeader())
    }

    getUserReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this._url + "users/reservations", this.getAuthHeader());
    }

    // ---------- ActivityProfile endpoints -----------

    getActivityProfiles(): Observable<ActivityProfile[]> {
        return this.http.get<ActivityProfile[]>(this._url + "activity-profiles")
    }

    getActivityProfileById(profileId: string): Observable<ActivityProfile> {
        return this.http.get<ActivityProfile>(this._url + "activity-profiles/" + profileId)
    }

    // ---------- Activity endpoints -----------

    findActivityByProfileAndDate(profileId: string, date: string): Observable<Activity> {
        return this.http.get<Activity>(this._url + "activities/profile/" + profileId + "/date/" + date)
    }

    
    createActivity(profileId: string, date: string): Observable<any> {
        return this.http.post<Activity>(this._url + "activities", {
            activityProfileId: profileId,
            activityDate: date
        })
    }

    // --------------- Reservation endpoints ---------------

    createReservation(reservationDTO: ReservationDTO): Observable<Reservation> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.getToken()
        })

        return this.http.post<Reservation>(this._url + "reservations", reservationDTO, {headers})
    }

}