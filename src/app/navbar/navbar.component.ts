import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {User} from "../services/user/user-list.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }


  logout() {
    this.authService.logout();
  }
}
