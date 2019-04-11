import * as PIXI from 'pixi.js';
import { Scene } from './scene';
import { MixedText } from '../components/mixedText';

export class TextDemo extends Scene {
  constructor(game) {
    super(game);

    this.mixedText = new MixedText(100, 100);
    this.mixedText.updateText(['Hello', 0, 'World'], 24);

    this.game.app.stage.addChild(this.mixedText);
  }

  destroy() {
    this.game.app.stage.removeChild(this.mixedText);
    this.mixedText.destroy({
      children: true
    });
  }
}