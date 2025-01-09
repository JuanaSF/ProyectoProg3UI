import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { Activity } from "../model/Activity";
import { Dayjs } from "dayjs";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    
    constructor(private apiService: ApiService) { }

    findActivityByProfileAndDate(profileId: string, date: string): Observable<Activity> {
        return this.apiService.findActivityByProfileAndDate(profileId, date)
    }

    createActivity(profileId: string, date: string): Observable<Activity> {
        return this.apiService.createActivity(profileId, date)
    }
}