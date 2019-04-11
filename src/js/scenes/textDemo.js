import * as PIXI from 'pixi.js';
import randomWords from 'random-words';
import { Scene } from './scene';
import { MixedText } from '../components/mixedText';
import { Button } from '../components/button';
import { intRandomRange, shuffle } from '../helpers';

const maxWordsPerPhrase = 5;
const maxEmotesPerSentence = 10;
const maxPhrasesPerSentence = 5;
const minFontSize = 24;
const maxFontSize = 48;

export class TextDemo extends Scene {
  constructor(game) {
    super(game);

    this.timeout = null;
    this.updateText = this.updateText.bind(this);

    const background = new PIXI.Graphics();

    background.beginFill(0x004080);
    background.drawRect(0, 0, this.game.baseWidth, this.game.baseHeight);
    background.endFill();

    this.addChild(background);

    this.mixedText = new MixedText(32, 100);
    this.addChild(this.mixedText);

    this.clickHandler = this.clickHandler.bind(this);

    this.backButton = new Button(500, 500, 'Test', () => this.clickHandler('TitleScreen'));
    this.addChild(this.backButton);

    this.updateText();
  }

  clickHandler(gotoScene) {
    this.game.changeScene(gotoScene);
  }

  updateText() {
    let newText = [];
    let numPhrases = intRandomRange(1, maxPhrasesPerSentence);
    let numEmotes = intRandomRange(1, maxEmotesPerSentence);
    const fontSize = intRandomRange(minFontSize, maxFontSize);

    for (let i=0; i<numPhrases; i++) {
      const numWords = intRandomRange(1, maxWordsPerPhrase);
      newText.push(...randomWords({exactly:1, wordsPerString:numWords}));
    }

    for (let i=0; i<numEmotes; i++) {
      newText.push(intRandomRange(0, 3));
    }

    newText = shuffle(newText);
    this.mixedText.updateText(newText, fontSize);

    this.timeout = setTimeout(this.updateText, 2000);
  }

  cleanup() {
    clearTimeout(this.timeout);
  }
}