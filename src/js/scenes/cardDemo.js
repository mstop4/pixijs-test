import * as PIXI from 'pixi.js';
import 'pixi-display';
import { Scene } from './scene';
import { Card } from '../components/card';
import { Button } from '../components/button';

const numCards = 144;

export class CardDemo extends Scene {
  constructor(app) {
    super(app);
    this.cards = [];
    this.curCard = 0;

    this.moveCard = this.moveCard.bind(this);
    const cardGroup = new PIXI.DisplayGroup(0, true);

    for (let i = 0; i < numCards; i++) {
      const card = new Card(50+i, 50+i, 500-i, 500-i, 'img/felt.png', cardGroup, i);

      this.cards.push(card);
      this.addChild(card);
    }

    this.clickHandler = this.clickHandler.bind(this);

    this.backButton = new Button(500, 500, 'img/felt.png', 'Test', () => this.clickHandler('TitleScreen'));
    this.addChild(this.backButton);

    this.moveCard();
  }

  clickHandler(gotoScene) {
    this.game.changeScene(gotoScene);
  }

  moveCard() {
    if (this.curCard < this.cards.length) {
      this.cards[this.curCard].moveStart();
      this.curCard++;
      setTimeout(this.moveCard, 1000);
    }
  }

  process(delta) {
    this.cards.forEach(card => card.process(delta));
  }
}