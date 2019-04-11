import * as PIXI from 'pixi.js';
import 'pixi-display';
import { Scene } from './scene';
import { Card } from '../components/card';

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
      this.game.app.stage.addChild(card);
    }

    this.moveCard();
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

  cleanup() {
    this.cards.forEach(card => {
      this.game.app.stage.removeChild(card);
      card.destroy({
        children: true
      });
    });
  }
}