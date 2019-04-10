import { Scene } from './scene.js';
import * as PIXI from 'pixi.js';

export class CardDemo extends Scene {
  constructor(app) {
    super(app);
    this.cards = [];
  }

  init() {
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const sprite = new PIXI.Sprite(
          PIXI.loader.resources['img/felt.png'].texture
        );

        sprite.x = i * 64;
        sprite.y = j * 64;

        this.cards.push(sprite);
        this.app.stage.addChild(sprite);
      }
    }
  }

  process(delta) {
    this.cards.forEach(card => card.rotation += 0.01 * delta);
  }

  cleanup() {
    this.cards.forEach(card => {
      this.app.stage.removeChild(card);
      card.destroy();
    });
  }
}