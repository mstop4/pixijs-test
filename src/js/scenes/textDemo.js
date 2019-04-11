import randomWords from 'random-words';
import { Scene } from './scene';
import { MixedText } from '../components/mixedText';
import { emoteIds } from '../manifests/mixedTextEmotes';
import { intRandomRange, shuffle } from '../helpers';

const maxWordsPerPhrase = 5;
const maxEmotesPerSentence = 10;
const maxPhrasesPerSentence = 5;
const minFontSize = 12;
const maxFontSize = 24;

export class TextDemo extends Scene {
  constructor(game) {
    super(game);

    this.updateText = this.updateText.bind(this);

    this.mixedText = new MixedText(32, 100);
    this.game.app.stage.addChild(this.mixedText);

    this.updateText();
  }

  updateText() {
    let newText = [];
    let numPhrases = intRandomRange(0, maxPhrasesPerSentence);
    let numEmotes = intRandomRange(0, maxEmotesPerSentence);
    const fontSize = intRandomRange(minFontSize, maxFontSize);

    for (let i=0; i<numPhrases; i++) {
      const numWords = intRandomRange(1, maxWordsPerPhrase);
      newText.push(...randomWords({exactly:1, wordsPerString:numWords}));
    }

    for (let i=0; i<numEmotes; i++) {
      newText.push(emoteIds.felt);
    }

    newText = shuffle(newText);
    this.mixedText.updateText(newText, fontSize);

    setTimeout(this.updateText, 2000);
  }

  destroy() {
    this.game.app.stage.removeChild(this.mixedText);
    this.mixedText.destroy({
      children: true
    });
  }
}