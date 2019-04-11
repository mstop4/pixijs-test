import { Scene } from './scene';
import { Button } from '../components/button';

export class TitleScreen extends Scene {
  constructor(game) {
    super(game);

    this.clickHandler = this.clickHandler.bind(this);

    this.cardDemoButton = new Button(100, 100, 'Cards Demo', () => this.clickHandler('CardDemo'));
    this.textDemoButton = new Button(100, 200, 'Text Demo', () => this.clickHandler('TextDemo'));
    this.fireDemoButton = new Button(100, 300, 'Fire Demo', () => this.clickHandler('FireDemo'));

    this.addChild(this.cardDemoButton);
    this.addChild(this.textDemoButton);
    this.addChild(this.fireDemoButton);
  }

  clickHandler(gotoScene) {
    this.game.changeScene(gotoScene);
  }
}