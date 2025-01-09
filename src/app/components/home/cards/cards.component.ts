import { Component, OnInit } from "@angular/core";
import { ActivityCard } from "./activity-card/activity-card.component";
import { ActivityProfileService } from "src/app/services/activity-profile.service";
import { ActivityProfile } from "src/app/model/ActivityProfile";

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {

    profiles!: ActivityProfile[]
    
    constructor(private activityProfileService: ActivityProfileService) {
    }

    ngOnInit(): void {
      this.activityProfileService.getActivityProfiles().subscribe(
        (data) => {
          this.profiles = data
        }
      )
    }

}