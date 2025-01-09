import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {

    formSignup = new FormGroup({
        lastName: new FormControl(),
        firstName: new FormControl(),
        email: new FormControl(),
        password: new FormControl()
    })

    constructor(private authService: AuthService) {}

    signup(): void {
        const val = this.formSignup.value

        this.authService.signup(val.firstName, val.lastName, val.email, val.password)
        this.formSignup.reset()
    }
}