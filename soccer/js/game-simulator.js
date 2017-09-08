
class GameSimulator {
  constructor() {
    this.modifiers = DEFAULT_MODIFIERS;
  }

  simulateGame(home, away) {
    let currentGame = new Game(home, away);
    this.modifiers = this.getOriginalModifiers(home, away);
  }

  setAttackValues(teamModifiers) {
    this.attackLimit = ATTACK_LIMIT_BASE_VALUE - ATTACK_LIMIT_SKILL_MODIFIER*(teamModifiers[0] - teamModifiers[1] + teamModifiers[2] - teamModifiers[3]);
  }

  getOriginalModifiers(home, away) {
    let modifiers = DEFAULT_MODIFIERS;
    modifiers.homeOff = home.getOffensiveRating();
    modifiers.homeDef = home.getDefensiveRating();
    modifiers.awayOff = away.getOffensiveRating();
    modifiers.awayDef = away.getDefensiveRating();
    return modifiers;
  }
}
