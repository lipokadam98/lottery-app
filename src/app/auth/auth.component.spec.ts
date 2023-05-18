import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthComponent} from './auth.component';
import {Router} from '@angular/router';
import {UserListService} from '../services/user/user-list.service';
import {AuthService} from '../services/auth/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;
  let userListService: UserListService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        MatIconModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule
      ],
      providers: [
        MatSnackBar
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userListService = TestBed.inject(UserListService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should update userId when userSelect value changes', () => {
    const selectValue = 1;
    component.authFormGroup.get('userSelect')?.setValue(selectValue);

    const userIdControl = component.authFormGroup.get('userId');
    expect(userIdControl?.value).toBe(selectValue);
  });


  it('should call checkPassword method with userId and password when authenticate is called', () => {
    const userId = 1;
    const password = 'password';
    spyOn(userListService, 'checkPassword');

    component.authFormGroup.get('userId')?.setValue(userId);
    component.authFormGroup.get('password')?.setValue(password);
    component.authenticate();

    expect(userListService.checkPassword).toHaveBeenCalledWith(userId, password);
  });

  it('should unsubscribe from authSub when component is destroyed', () => {
    spyOn(component.authSub, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.authSub.unsubscribe).toHaveBeenCalled();
  });
});
