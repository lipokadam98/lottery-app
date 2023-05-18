import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  generateRandomNumbers(min: number, max: number, numberLength: number = 6): number[] {
    const randomNumbers: number[] = [];

    while (randomNumbers.length < numberLength) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    return randomNumbers;
  }
}
