import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.scss']
})
export class TournamentViewComponent implements AfterViewInit{

  public rounds: number[] = [];
  public isOpen: boolean = false;
  public tournamentTitle: string = 'Tournament Example';
  public numberTeam: number = 8;
  public teams = ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8'];
  tournament: any[][] = []

  ngAfterViewInit() {
    // An example of tournament board will be displayed as soon as the view is ready;
    this.createTournament();
  }

  createTournament() {
    // This function is used to plot the tounament board;
    this.tournament = [];
    this.rounds = [];
    let round = 0;
    for (let roundLenght = this.numberTeam; roundLenght !== 1;) {
      round += 1;
      let roundMatchPosition = 1;
      let matches = []
      let roundTeamsCounter = 0;
      this.rounds.push(roundLenght);
      if (roundLenght === this.numberTeam) {
        for (; roundTeamsCounter < roundLenght; roundTeamsCounter+=2) {
          matches.push(
            { 
              teams: [this.teams[roundTeamsCounter], this.teams[roundTeamsCounter+1]],
              position: roundTeamsCounter,
              match: roundMatchPosition,
              round: round,
            }
          )
          roundMatchPosition += 1;
        }
      } else {
        for (; roundTeamsCounter < roundLenght; roundTeamsCounter+=2) {
          matches.push(
            { 
              teams: [],
              position: roundTeamsCounter,
              match: roundMatchPosition,
              round: round,
            }
          )
          roundMatchPosition += 1;
        }
      }
      roundLenght = roundLenght/2;
      this.tournament.push(matches);
    }
    this.rounds.push(1);
    this.tournament.push([{
      winner: ' ',
      round: round
    }])
  }

  openSideNav() {
    // Function used to open config new tournament sidenav;
    this.isOpen = true;
  }

  closeSideNav() {
    // Function used to close config tournament sidenav
    this.isOpen = false;
  }

  getValuefromSide(event: any) {
    // Fuction used to get values from config sidenav and use it to plot new torunament board;
    this.isOpen = false;
    this.teams = event.teams;
    this.numberTeam = event.tournamentSize;
    this.tournamentTitle = event.tournamentTitle;
    this.createTournament();
  }

  chooseWinner(event: any) {
    // Function used to declare who will advance to the next match, till we find a winner;
      let match = event.matchNumber;
      let winner = event.team;
      let round = event.index;
      let matchUp = 1;
      if (match % 2 !== 0) {
        match += 1;
        matchUp = 0;
      }
    console.log(this.tournament.length, round+2 === this.tournament.length, round+1);
    if ((round + 2) === this.tournament.length) {
      console.log(round);
      this.tournament[round+1][0].winner = winner;
    } else {
      this.tournament[round+1][(match/2)-1].teams[matchUp] = winner;
    }
    console.log(event);
  }
}
