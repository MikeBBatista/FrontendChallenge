import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-team-match',
  templateUrl: './team-match.component.html',
  styleUrls: ['./team-match.component.scss']
})
export class TeamMatchComponent {
  @Input() public index!: number;
  @Input() public tournament!: any[][];
  @Output() public teamWinner = new EventEmitter();

  winnerOfMatch(team: string, index: number, matchNumber: number) {
    // Function used to get the team winner of one match
    const winner = {
      team: team,
      index: index,
      matchNumber: matchNumber,
    }
    this.teamWinner.emit(winner);
  }
}
