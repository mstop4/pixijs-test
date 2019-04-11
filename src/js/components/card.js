import * as PIXI from 'pixi.js';
import { easeOutCubic, lerp, clamp } from '../helpers';

export class Card extends PIXI.Container {
  constructor(startX, startY, endX, endY, textureID, displayGroup, zOrder) {
    super();

    this.x = startX;
    this.y = startY;
    this.displayGroup = displayGroup;
    this.absoluteZOrder = zOrder;
    this.zOrder = zOrder;

    this.startCoords = {
      x: startX,
      y: startY
    };

    this.endCoords = {
      x: endX,
      y: endY
    };

    this.isMoving = false;
    this.curTime = 0;
    this.animDuration = 120;

    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources[textureID].texture
    );

    this.sprite.anchor.set(0.5);
    this.addChild(this.sprite);
  }

  moveStart() {
    this.isMoving = true;
  }

  process(delta) {
    if (this.isMoving) {
      this.curTime += delta;
      const t = clamp(easeOutCubic(0, 1, this.curTime / this.animDuration), 0, 1);
      this.x = lerp(this.startCoords.x, this.endCoords.x, t);
      this.y = lerp(this.startCoords.y, this.endCoords.y, t);

      if (t >= 0.5 && this.zOrder > 0) {
        this.zOrder = -this.absoluteZOrder;
      }

      if (t === 1) {
        this.isMoving = false;
      }
    }
  }
}