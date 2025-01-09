import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ActivityComponent } from "./components/activity/activity.component";
import { SignupComponent } from "./components/signup/signup.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ReservationsComponent } from "./components/reservations/reservations.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ErrorPageComponent } from "./components/error-page/error-page.component";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'activity/:id', component: ActivityComponent},
    {path: 'checkout/:activityId', component: CheckoutComponent},
    {path: 'reservations', component: ReservationsComponent},
    {path: 'error-page', component: ErrorPageComponent},
    {path: '**', component: NotFoundComponent }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }