import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CardsComponent } from './components/home/cards/cards.component';
import { ActivityCard } from './components/home/cards/activity-card/activity-card.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent as SignupComponent } from './components/signup/signup.component';
import { ActivityComponent } from './components/activity/activity.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DetailsComponent } from './components/checkout/details/details.component';
import { CalendarComponent } from './components/activity/calendar/calendar.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReservationInfoComponent } from './components/reservations/reservation-info/reservation-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardsComponent,
    ActivityCard,
    LoginComponent,
    SignupComponent,
    ActivityComponent,
    CheckoutComponent,
    DetailsComponent,
    CalendarComponent,
    ReservationsComponent,
    ReservationInfoComponent,
    NotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
