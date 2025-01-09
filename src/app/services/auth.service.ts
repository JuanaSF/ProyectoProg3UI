import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { ResponseLoginDTO } from "../dto/ResponseLoginDTO";
import { User } from "../model/User";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedUser = false

  constructor(private apiService: ApiService, private router: Router) { }

  login(email: string, password: string): Observable<ResponseLoginDTO> {
    let response = this.apiService.login(email, password)
    response.subscribe(
      (jwt) => {
        console.log(jwt)
        localStorage.setItem('token', jwt.token!)
        this.isLoggedUser = true
        this.router.navigateByUrl("/")
      }
    )
    return response
  }

  isUserLogin(): Observable<boolean> {
    this.isLoggedUser = !!localStorage.getItem("token")
    return of(this.isLoggedUser)
  }

  logout() {
    localStorage.removeItem('token')
    this.isLoggedUser = false
  }

  signup(firstName: string, lastName: string, email: string, password: string): Observable<User> {
    let newUser: User = new User(firstName, lastName, email, password)
    let userRes= this.apiService.signup(newUser)
    userRes.subscribe((res) => {
      this.router.navigateByUrl("/")
    })
    return userRes
  }

}