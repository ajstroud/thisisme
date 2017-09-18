
class App {
  constructor() {
    this.simScreen = new SimScreen(document.querySelector('#simulator'));
    this.gameSetupScreen = new GameSetupScreen(document.querySelector('#game-setup'));
  }
}
