import * as PIXI from 'pixi.js';

export class Scene extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;
  }

  process() {
    // Code to run every step here
  }

  cleanup() {
    // Code to clean up loose ends here
  }
}