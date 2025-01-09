import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-activity-card',
    templateUrl: './activity-card.component.html',
})
export class ActivityCard {

    @Input() profile: any;

    constructor() {
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
}