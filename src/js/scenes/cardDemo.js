import { Scene } from './scene';
import * as PIXI from 'pixi.js';

export class CardDemo extends Scene {
  constructor(app) {
    super(app);
    this.cards = [];

    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const card = new PIXI.Sprite(
          PIXI.loader.resources['img/felt.png'].texture
        );

        card.x = i * 64;
        card.y = j * 64;
        card.anchor.set(0.5);

        this.cards.push(card);
        this.game.app.stage.addChild(card);
      }
    }
  }

  process(delta) {
    this.cards.forEach(card => card.rotation += 0.01 * delta);
  }

  cleanup() {
    this.cards.forEach(card => {
      this.game.app.stage.removeChild(card);
      card.destroy();
    });
  }
}