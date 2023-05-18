import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
    gameService = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  it('should generate an array of random numbers within the specified range', () => {
    const min = 1;
    const max = 49;
    const numberLength = 6;

    const randomNumbers = gameService.generateRandomNumbers(min, max, numberLength);

    expect(randomNumbers.length).toBe(numberLength);
    expect(randomNumbers.every(number => number >= min && number <= max)).toBeTrue();
    expect(new Set(randomNumbers).size).toBe(numberLength); // Ensures all numbers are unique
  });
});
