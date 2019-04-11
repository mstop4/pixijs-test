import * as PIXI from 'pixi.js';
import { Scene } from './scene';
import { Button } from '../components/button';

export class TitleScreen extends Scene {
  constructor(app) {
    super(app);

    this.button = new Button(100, 100, 'img/felt.png', 'Test', this.clickHandler);
    this.app.stage.addChild(this.button);
  }

  clickHandler() {
    console.log('OK');
  }

  destroy() {
    this.app.stage.removeChild(this.button);
    this.button.destroy({
      children: true
    });
  }
}