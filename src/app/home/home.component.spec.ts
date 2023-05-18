import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {LottoGridComponent} from '../lotto-grid/lotto-grid.component';
import {MatIconModule} from "@angular/material/icon";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,LottoGridComponent ],
      imports: [MatIconModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize panels array with the correct length', () => {
    const expectedLength = 4;
    expect(component.panels.length).toBe(expectedLength);
  });

});
