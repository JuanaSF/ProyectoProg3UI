import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { ActivityProfile } from "../model/ActivityProfile";

@Injectable({
    providedIn: 'root'
})
export class ActivityProfileService {
    

    constructor(private apiService: ApiService) {
    }

    getActivityProfiles(): Observable<ActivityProfile[]> {
        return this.apiService.getActivityProfiles();
    }

    getActivityProfileInfo(profileId: string): Observable<ActivityProfile> {
        return this.apiService.getActivityProfileById(profileId)
    }

}