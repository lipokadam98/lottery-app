import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/user/user-list.service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [ AuthService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set user when the authService emits a user', () => {
    const mockUser: User = {userId: 1,userName: 'asd', password: 'asd'};
    spyOn(authService, 'getUser').and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(component.user).toBe(mockUser);
  });

  it('should call logout method of authService when logout is called', () => {
    spyOn(authService, 'logout');

    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
