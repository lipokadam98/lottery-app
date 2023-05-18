import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

export interface User {
  userId: number;
  userName: string;
  password: string;
}

const USERDATA: User[] = [
  {
    userId: 1,
    userName: "JohnDoe",
    password: "password123"
  },
  {
    userId: 2,
    userName: "JaneSmith",
    password: "qwerty456"
  },
  {
    userId: 3,
    userName: "AliceJohnson",
    password: "pass1234"
  }
];


@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private _userSubject = new BehaviorSubject<User[]>(USERDATA);

  constructor(private authService: AuthService,
              private matSnackBar: MatSnackBar,
              private router: Router) {
  }

  loadUsers() {
    this._userSubject.next(USERDATA);
  }

  getUsers() {
    return this._userSubject.asObservable();
  }

  checkPassword(userId: number, password: string) {
    const user = USERDATA.find(user => user.userId === userId && user.password === password);
    if (user) {
      this.authService.setUser(user);
      this.router.navigate(['']).then();
    } else {
      this.matSnackBar.open("UserId or password is wrong!", "OK!", {duration: 5000});
      this.authService.setUser(null);
    }
  }
}
