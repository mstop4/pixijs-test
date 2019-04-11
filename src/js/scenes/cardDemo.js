import { Scene } from './scene';
import { Card } from '../components/card';

const numCards = 144;

export class CardDemo extends Scene {
  constructor(app) {
    super(app);
    this.cards = [];
    this.curCard = 0;

    this.moveCard = this.moveCard.bind(this);

    for (let i = 0; i < numCards; i++) {
      const card = new Card(50, 50, 350, 350, 'img/felt.png');

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