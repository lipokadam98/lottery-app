import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../services/game/game.service";

export interface LottoItem {
  index: number,
  highlighted: boolean
}

@Component({
  selector: 'app-lotto-grid',
  templateUrl: './lotto-grid.component.html',
  styleUrls: ['./lotto-grid.component.scss']
})
export class LottoGridComponent implements OnInit {

  @Input()
  panelItemCount = 49;

  @Input()
  index: number | undefined;

  numbers: LottoItem[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.panelItemCount; i++) {
      this.numbers.push({index: i, highlighted: false});
    }
  }

  checkNum(index: number) {
    let lottoItem = this.numbers[index - 1];
    if (lottoItem) {
      lottoItem.highlighted = !lottoItem.highlighted;
    }
  }

  clearPanel() {
    this.numbers.forEach(item => {
      item.highlighted = false;
    });
  }

  generateRandom() {
    this.clearPanel();

    const randomNumbers = this.gameService.generateRandomNumbers(1, 49);

    randomNumbers.forEach(number => {
      this.numbers.forEach(lottoItem => {
        if (lottoItem.index === number) {
          lottoItem.highlighted = true;
        }
      })
    });
  }

  play() {
    return this.numbers.filter(item => item.highlighted).map(item => item.index);
  }

}
