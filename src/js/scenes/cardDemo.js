import * as PIXI from 'pixi.js';
import 'pixi-display';
import { Scene } from './scene';
import { Card } from '../components/card';
import { Button } from '../components/button';
import cardTypes from '../manifests/cardTypes';
import { intRandomRange } from '../helpers';

const numCards = 144;

export class CardDemo extends Scene {
  constructor(app) {
    super(app);

    this.cards = [];
    this.curCard = 0;
    this.timeout = null;

    this.moveCard = this.moveCard.bind(this);
    const cardGroup = new PIXI.DisplayGroup(0, true);
    const spriteSheet = PIXI.loader.resources['img/cards.json'];

    const background = new PIXI.Graphics();

    background.beginFill(0x008060);
    background.drawRect(0, 0, this.game.baseWidth, this.game.baseHeight);
    background.endFill();

    this.addChild(background);

    for (let i = 0; i < numCards; i++) {
      const type = cardTypes[intRandomRange(0, cardTypes.length)];
      const texture = spriteSheet.textures[type];

      const card = new Card(texture.width/2+16, texture.height/2+i*6, this.game.baseWidth-texture.width/2-16, this.game.baseHeight-texture.height/2-i*6, spriteSheet.textures[type], cardGroup, i);

      this.cards.push(card);
      this.addChild(card);
    }

    this.clickHandler = this.clickHandler.bind(this);

    this.backButton = new Button(360, 1200, 'img/felt.png', 'Test', () => this.clickHandler('TitleScreen'));
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
      this.timeout = setTimeout(this.moveCard, 1000);
    }
  }

  process(delta) {
    this.cards.forEach(card => card.process(delta));
  }

  cleanup() {
    clearTimeout(this.timeout);
  }
}