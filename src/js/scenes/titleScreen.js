import { Scene } from './scene';
import { Button } from '../components/button';

export class TitleScreen extends Scene {
  constructor(game) {
    super(game);

    this.clickHandler = this.clickHandler.bind(this);

    this.button = new Button(100, 100, 'img/felt.png', 'Test', this.clickHandler);
    this.game.app.stage.addChild(this.button);
  }

  clickHandler() {
    this.game.changeScene('CardDemo');
  }

  destroy() {
    this.game.app.stage.removeChild(this.button);
    this.button.destroy({
      children: true
    });
  }
}