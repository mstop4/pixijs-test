import { Scene } from './scene';
import { MixedText } from '../components/mixedText';
import { emoteIds } from '../manifests/mixedTextEmotes';

export class TextDemo extends Scene {
  constructor(game) {
    super(game);

    this.mixedText = new MixedText(100, 100);
    this.mixedText.updateText(['Hello', emoteIds.felt , emoteIds.felt, 'World', 'foo foo foo', emoteIds.felt], 24);

    this.game.app.stage.addChild(this.mixedText);
  }

  destroy() {
    this.game.app.stage.removeChild(this.mixedText);
    this.mixedText.destroy({
      children: true
    });
  }
}