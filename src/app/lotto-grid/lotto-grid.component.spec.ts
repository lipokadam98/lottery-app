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
      declarations: [ LottoGridComponent ],
      imports: [MatIconModule],
      providers: [ GameService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoGridComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the numbers array with the correct length', () => {
    const expectedLength = 49;
    expect(component.numbers.length).toBe(expectedLength);
  });

  it('should highlight a number when checkNum is called', () => {
    const index = 1;
    const lottoItem: LottoItem = { index: index, highlighted: false };
    component.numbers.push(lottoItem);

    component.checkNum(index);

    expect(component.numbers[index - 1].highlighted).toBe(true);
  });

  it('should clear all numbers when clearPanel is called', () => {
    component.numbers.forEach(item => {
      item.highlighted = true;
    });

    component.clearPanel();

    expect(component.numbers.every(item => !item.highlighted)).toBe(true);
  });

  it('should generate random numbers and highlight them', () => {
    spyOn(component, 'clearPanel');
    const randomNumbers = [1, 5, 10];
    spyOn(gameService, 'generateRandomNumbers').and.returnValue(randomNumbers);

    component.generateRandom();

    expect(component.clearPanel).toHaveBeenCalled();
    expect(gameService.generateRandomNumbers).toHaveBeenCalledWith(1, 49);

    randomNumbers.forEach(number => {
      const highlightedItem = component.numbers.find(item => item.index === number);
      expect(highlightedItem?.highlighted).toBe(true);
    });
  });

  it('should return an array of highlighted numbers when play is called', () => {
    const highlightedNumbers = [1, 5, 10];
    highlightedNumbers.forEach(number => {
      component.numbers[number - 1].highlighted = true;
    });

    const result = component.play();

    expect(result).toEqual(highlightedNumbers);
  });
});
