import { Scene } from './scene';
import { MixedText } from '../components/mixedText';
import { emoteIds } from '../manifests/mixedTextEmotes';

export class TextDemo extends Scene {
  constructor(game) {
    super(game);

    this.mixedText = new MixedText(100, 100);
    this.mixedText.updateText(['Hello', emoteIds.felt , emoteIds.felt, 'World', 'foo foo foo', emoteIds.felt], 24);

    this.game.app.stage.addChild(this.mixedText);

    setTimeout(() => {
      this.mixedText.updateText([emoteIds.felt , emoteIds.felt,  emoteIds.felt, emoteIds.felt, emoteIds.felt, emoteIds.felt, 'felt'], 36);
    }, 2000);

    setTimeout(() => {
      this.mixedText.updateText(['fdsf', 'dsfsfewf', 'sfewffvv', 'sdfdsfdsfdsfdsf', 'dsfdsfsdfd'], 12);
    }, 4000);
  }

  destroy() {
    this.game.app.stage.removeChild(this.mixedText);
    this.mixedText.destroy({
      children: true
    });
  }
}