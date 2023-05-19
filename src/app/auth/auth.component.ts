import {Router} from '@angular/router';
import {Subscription, take} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserListService} from "../services/user/user-list.service";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authFormGroup: FormGroup = new FormGroup({});
  authSub = new Subscription();
  users: User[] = [];

  constructor(private router: Router,
              private userListService: UserListService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authFormGroup = new FormGroup({
      'userSelect': new FormControl(null),
      'userId': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    this.userListService.loadUsers();

    this.userListService.getUsers().pipe(take(1)).subscribe(users => {
      this.users = users;
    });

    this.authFormGroup.get('userSelect')?.valueChanges.subscribe(select => {
      this.authFormGroup.get('userId')?.setValue(select);
    });

    this.authSub = this.authService.getUser().subscribe(user => {
      if (user) {
        this.router.navigate(['']).then();
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  authenticate() {
    const userId = this.authFormGroup.get('userId')?.value;
    const password = this.authFormGroup.get('password')?.value;
    this.userListService.checkPassword(+userId, password);
  }


}
