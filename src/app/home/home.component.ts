import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {LottoGridComponent} from "../lotto-grid/lotto-grid.component";

export interface PanelSelections {
  panelIndex: number,
  selections: number[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChildren(LottoGridComponent) gridComponents: QueryList<LottoGridComponent> | undefined;

  panelSelections: PanelSelections[] = [];
  panels: number[] = [];

  numberOfMarks = 6;

  ngOnInit(): void {
    for (let i = 1; i <= 4; i++) {
      this.panels.push(i);
    }
  }

  play() {
    this.panelSelections = [];
    this.gridComponents?.forEach(comp => {
      this.panelSelections.push({panelIndex: 0, selections: comp.play()});
    });
  }


}
