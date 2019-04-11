import * as PIXI from 'pixi.js';
import { Scene } from './scene';
import { Button } from '../components/button';

export class TitleScreen extends Scene {
  constructor(game) {
    super(game);

    this.clickHandler = this.clickHandler.bind(this);

    const background = new PIXI.Graphics();

    background.beginFill(0x606080);
    background.drawRect(0, 0, this.game.baseWidth, this.game.baseHeight);
    background.endFill();

    this.addChild(background);

    this.cardDemoButton = new Button(210, 200, 'Cards Demo', () => this.clickHandler('CardDemo'));
    this.textDemoButton = new Button(210, 400, 'Text Demo', () => this.clickHandler('TextDemo'));
    this.fireDemoButton = new Button(210, 600, 'Fire Demo', () => this.clickHandler('FireDemo'));

    this.addChild(this.cardDemoButton);
    this.addChild(this.textDemoButton);
    this.addChild(this.fireDemoButton);
  }

  clickHandler(gotoScene) {
    this.game.changeScene(gotoScene);
  }
}