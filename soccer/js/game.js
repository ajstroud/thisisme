
class Game {
  constructor(home, away) {
    this.home = home;
    this.away = away;
    this.minutes = [];
  }

  addMinute(ballPos, goalScored) {
    let minute = {};
    minute.ballPos = ballPos;
    if(ballPos > 0) {
      //home ball, do according calculations
    } else {
      // away ball, do THOSE according calculations
    }
    this.minutes.append(minute);
  }

  getHomeScore() {
    return minutes[minutes.length - 1].homeScore;
  }

  getAwayScore() {
    return minutes[minutes.length - 1].awayScore;
  }
}

/*
Each minute has several attributes:
  ballPos
  homeScore
  awayScore

*/
