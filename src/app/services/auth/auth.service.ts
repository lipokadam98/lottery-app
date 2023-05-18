import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user/user-list.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
  }


  setUser(user: User | null) {
    this.user.next(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return this.user.asObservable();
  }

  logout() {
    this.user.next(null);
    sessionStorage.removeItem("user");
    this.router.navigate(['login']).then();
  }

  autoLogin() {

    const user: User = JSON.parse(sessionStorage.getItem('user') || '{}');
    const isEmpty = Object.keys(user).length === 0;

    if (isEmpty) {
      this.user.next(null);
    } else {
      this.user.next(user);
    }

  }

}
