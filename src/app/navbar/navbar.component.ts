import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {User} from "../services/user/user-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  userSub = new Subscription();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
