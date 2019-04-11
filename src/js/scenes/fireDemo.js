import * as PIXI from 'pixi.js';
import { Scene } from './scene';
import { Fire } from '../components/fire';
import { Button } from '../components/button';

export class FireDemo extends Scene {
  constructor(game) {
    super(game);

    const background = new PIXI.Graphics();

    background.beginFill(0x202020);
    background.drawRect(0, 0, this.game.baseWidth, this.game.baseHeight);
    background.endFill();

    this.addChild(background);
    this.fire = new Fire(360, 640);
    this.addChild(this.fire);

    this.clickHandler = this.clickHandler.bind(this);

    this.backButton = new Button(210, 1100, 'Back', () => this.clickHandler('TitleScreen'));
    this.addChild(this.backButton);
  }

  clickHandler(gotoScene) {
    this.game.changeScene(gotoScene);
  }

  process(delta) {
    this.fire.process(delta);
  }
}