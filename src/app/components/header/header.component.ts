import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    isLogged!: any

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.isLogged = this.authService.isUserLogin()
        console.log(this.isLogged)
    }

    logout() {
        this.authService.logout()
        this.isLogged = false
    }
}
