import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent {

    @Input() details!: any
    activity!: any
    people!: string
    date!: string

    ngOnInit() {
        this.activity = this.details.activity
        this.people = this.details.attendeeDetail
        this.date = this.details.dateDetail
        console.log(this.details)
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