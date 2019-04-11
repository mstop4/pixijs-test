import * as PIXI from 'pixi.js';
import { easeOutCubic, lerp } from '../helpers';

export class Card extends PIXI.Container {
  constructor(startX, startY, endX, endY, textureID) {
    super();

    this.x = startX;
    this.y = startY;

    this.startCoords = {
      x: startX,
      y: startY
    };

    this.endCoords = {
      x: endX,
      y: endY
    };

    this.t = 0;
    this.isMoving = false;
    this.startTime = 0;
    this.animDuration = 2000;

    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources[textureID].texture
    );

    this.sprite.anchor.set(0.5);
    this.addChild(this.sprite);
  }

  moveStart() {
    this.isMoving = true;
    this.startTime = Date.now();
  }

  process() {
    if (this.isMoving) {
      this.t = Math.min(1, (Date.now() - this.startTime) / this.animDuration); 
      this.x = easeOutCubic(this.startCoords.x, this.endCoords.x, this.t);
      this.y = easeOutCubic(this.startCoords.y, this.endCoords.y, this.t);

      if (this.t === 1) {
        this.isMoving = false;

      }
    }
  }
}