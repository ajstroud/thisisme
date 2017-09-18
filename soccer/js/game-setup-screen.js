
class GameSetupScreen {
  constructor(container) {
    this.container = container;
  }

  hide() {
    this.container.classList.add('inactive');
  }

  show() {
    this.container.classList.remove('inactive');
  }
}
