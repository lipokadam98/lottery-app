import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LottoGridComponent, LottoItem } from './lotto-grid.component';
import { GameService } from '../services/game/game.service';
import {MatIconModule} from "@angular/material/icon";

describe('LottoGridComponent', () => {
  let component: LottoGridComponent;
  let fixture: ComponentFixture<LottoGridComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LottoGridComponent],
      imports: [MatIconModule],
      providers: [GameService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoGridComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize numbers array with panelItemCount items', () => {
    const expectedItemCount = 49;
    expect(component.numbers.length).toBe(expectedItemCount);
  });

  it('should set highlighted property to true when checkNum is called', () => {
    const item: LottoItem = { index: 1, highlighted: false };
    component.checkNum(item);
    expect(item.highlighted).toBe(true);
  });

  it('should clear the panel by setting all highlighted properties to false', () => {
    const item1: LottoItem = { index: 1, highlighted: true };
    const item2: LottoItem = { index: 2, highlighted: true };
    component.numbers = [item1, item2];
    component.clearPanel();
    expect(item1.highlighted).toBe(false);
    expect(item2.highlighted).toBe(false);
  });

  it('should generate random numbers and set corresponding items as highlighted', () => {
    spyOn(gameService, 'generateRandomNumbers').and.returnValue([1, 3, 5]);
    component.generateRandom();
    expect(component.numbers[0].highlighted).toBe(true);
    expect(component.numbers[1].highlighted).toBe(false);
    expect(component.numbers[2].highlighted).toBe(true);
  });

  it('should return an array of indexes for the highlighted items when play is called', () => {
    const item1: LottoItem = { index: 1, highlighted: true };
    const item2: LottoItem = { index: 2, highlighted: false };
    const item3: LottoItem = { index: 3, highlighted: true };
    component.numbers = [item1, item2, item3];
    const result = component.play();
    expect(result).toEqual([1, 3]);
  });
});
