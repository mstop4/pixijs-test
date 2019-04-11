import { Scene } from './scene';
import { Button } from '../components/button';

export class TitleScreen extends Scene {
  constructor(game) {
    super(game);

    this.clickHandler = this.clickHandler.bind(this);

    this.cardDemoButton = new Button(100, 100, 'img/felt.png', 'Test', () => this.clickHandler('CardDemo'));
    this.textDemoButton = new Button(100, 200, 'img/felt.png', 'Test', () => this.clickHandler('TextDemo'));

    this.game.app.stage.addChild(this.cardDemoButton);
    this.game.app.stage.addChild(this.textDemoButton);
  }

  clickHandler(gotoScene) {
    this.game.changeScene(gotoScene);
  }

  destroy() {
    this.game.app.stage.removeChild(this.button);
    this.cardDemoButton.destroy({
      children: true
    });

    this.textDemoButton.destroy({
      children: true
    });
  }
}