
class GameSimulator {
  constructor() {
    this.modifiers = DEFAULT_MODIFIERS;
  }

  simulateGame(home, away) {
    let currentGame = new Game(home, away);
    let modifiers = this.getOriginalModifiers(home, away);
    this.setAttackValues(modifiers);

    this.attackModifiers = getAdjustedModifiers(home, away);

    let ballPos = 0;
    this.doAttack = false;

    for(let i = 0; i < 90; i++) {
      ballPos = this.computeBallMovement(modifiers, ballPos);

      if(this.doAttack) {
        if(ballPos > 0) {
          this.runAttack(this.attackModifiers[0]);
        } else {
          this.runAttack(this.attackModifiers[1]);
        } // run an attack

        this.doAttack = false;
      }
    }
  }

  setAttackValues(teamModifiers) {
    this.attackLimit = ATTACK_LIMIT_BASE_VALUE - ATTACK_LIMIT_SKILL_MODIFIER*(teamModifiers[0] - teamModifiers[1] + teamModifiers[2] - teamModifiers[3]);
    this.resetTo = attackLimit - RESET_TO_DIFFERENCE;
    if(this.resetTo < 0) this.resetTo = 0;
  }

  getOriginalModifiers(home, away) {
    let modifiers = DEFAULT_MODIFIERS;
    modifiers.homeOff = home.getOffensiveRating();
    modifiers.homeDef = home.getDefensiveRating();
    modifiers.awayOff = away.getOffensiveRating();
    modifiers.awayDef = away.getDefensiveRating();
    return modifiers;
  }

  getAdjustedModifiers(home, away) {
    let modifiers = this.getOriginalModifiers(home, away);
    let homeOffRaw = this.computeRawRating(this.correctRating(modifiers.homeOff), true);
    let homeDefRaw = this.computeRawRating(this.correctRating(modifiers.homeDef), false);
    let awayOffRaw = this.computeRawRating(this.correctRating(modifiers.awayOff), true);
    let awayDefRaw = this.computeRawRating(this.correctRating(modifiers.homeDef), false);

    let homeOffAdj = this.computeOffFromDef(awayDefRaw);
    let awayOffAdj = this.computeOffFromDef(homeDefRaw);

    let atkmodifiers = [];
    atkmodifiers[0] = (homeOffRaw + homeOffAdj)/2.0;
    atkmodifiers[1] = (awayOffRaw + awayOffAdj)/2.0;
    return atkmodifiers;
  }

  correctRating(rating) {
    if(rating > 100) return 100;
    else if(rating < 0) return 0;
    else return rating;
  }

  computeRawRating(rating, offense) {
    let rawRating = 0;
    if(offense) {
      rawRating = 0.792430469 + 0.0041985269*rating - 0.0000009427264*rating*rating;
    } else {
      rawRating = 0.891874342 + 0.0022337705*rating - 0.000001425147*rating*rating;
    }
    return rawRating;
  }

  computeOffFromDef(rating) {
    return 2.107264849 - 0.2477073564*rating - 0.8595678188*rating*rating;
  }

  computeBallMovement(teamModifiers, ballPosition) {
    let homeForward = 13*Math.random() + (teamModifiers.homeOff - teamModifiers.awayDef)/BALL_MOVEMENT_SKILL_DIVISOR;
    let awayForward = 13*Math.random() + (teamModifiers.awayOff - teamModifiers.homeDef)/BALL_MOVEMENT_SKILL_DIVISOR;

    let newBallPosition = ballPosition + homeForward - awayForward;
    if(newBallPosition >= this.attackLimit) {
      this.doAttack = true;
      newBallPosition = this.resetTo;
    } else if(newBallPosition <= -this.attackLimit) {
      this.doAttack = true;
      newBallPosition = -this.resetTo;
    }

    return newBallPosition;
  }

  //TODO finish the attack running code
  runAttack(modifier) {
    return this.runC1(modifier);
  }

  runC1(modifier) {
    console.log('C1');
    let randc1 = Math.random();

    if(randc1 < 1 - modifier*(15.0/26.0)) {
      //dead
      return false;
    } else if(randc1 < 1 - modifier*(3.0/26.0)) {
      //to C2
      return this.runC2(modifier);
    } else if(randc1 < 1 - modifier*(1.0/13.0)) {
      //to C3
      return this.runC3(modifier);
    } else {
      //to FK1
      return this.runFK1(modifier);
    }
  }

  runC2(modifier) {
    console.log('C2');
    let randc2 = Math.random();

    if(randc2 < 1 - modifier*(11.0/26.0)) {
      //dead
      return false;
    } else if(randc2 < 1 - modifier*(5.0/26.0)) {
      //to C3
      return this.runC3(modifier);
    } else if(randc2 < 1 - modifier*(1.0/26.0/26.0)) {
      //to FK2
      return this.runFK2(modifier);
    } else {
      //to PK
      return this.runPK(modifier);
    }
  }

  runFK1(modifier) {
    console.log('FK1');
    let randfk1 = Math.random();

    if(randfk1 < 1 - modifier*(5.0/26.0)) {
      //dead
      return false;
    } else if(randfk1 < 1 - modifier*(1.0/26.0)) {
      //to C3
      return this.runC3(modifier);
    } else {
      //goal
      return true;
    }
  }

  runC3(modifier) {
    console.log('C3');
    let randc3 = Math.random();

    if(randc3 < 1 - modifier*(5.0/26.0)) {
      return true;
    } else {
      return false;
    }
  }

  runFK2(modifier) {
    console.log('FK2');
    let randfk2 = Math.random();

    if(randfk2 < 1 - modifier*(7.0/26.0)) {
      return true;
    } else {
      return false;
    }
  }

  runPK(modifier) {
    console.log('PK');
    let randpk = Math.random();

    if(randpk < 1 - modifier*(10.0/13.0)) {
      return true;
    } else {
      return false;
    }
  }
}
