import * as PIXI from 'pixi.js';

export class Scene extends PIXI.Container {
  constructor(game) {
    super();

    this.game = game;
    this.updateSize();
  }

  updateSize() {
    const hRatio = window.innerHeight / (this.game.baseHeight);
    const wRatio = window.innerWidth / (this.game.baseWidth);
    const leastRatio = Math.min(hRatio, wRatio);

    this.x = Math.max(0, (window.innerWidth - this.game.baseWidth * leastRatio) / 2) ;
    this.y = Math.max(0, (window.innerHeight - this.game.baseHeight * leastRatio) / 2);
    this.scale = new PIXI.Point(leastRatio, leastRatio);
  
    console.log((window.innerWidth - this.game.baseWidth) / 2);
  }

  process() {
    // Code to run every step here
  }

  cleanup() {
    // Code to clean up loose ends here
  }
}