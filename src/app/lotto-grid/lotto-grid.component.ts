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
  index?: number;

  @Input()
  markCount = 6;

  numbers: LottoItem[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.panelItemCount; i++) {
      this.numbers.push({index: i, highlighted: false});
    }
  }

  checkNum(item: LottoItem) {
    item.highlighted = !item.highlighted;
  }

  clearPanel() {
    this.numbers.forEach(item => {
      item.highlighted = false;
    });
  }

  generateRandom() {
    this.clearPanel();

    const randomNumbers = this.gameService.generateRandomNumbers(1, this.panelItemCount, this.markCount);

    for (const number of randomNumbers) {
      const lottoItem = this.numbers.find(item => item.index === number);
      if (lottoItem) {
        lottoItem.highlighted = true;
      }
    }
  }

  play() {
    return this.numbers.filter(item => item.highlighted).map(item => item.index);
  }

}
