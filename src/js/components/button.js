import * as PIXI from 'pixi.js';

export class Button extends PIXI.Container {
  constructor(x, y, textureID, text, onClick) {
    super();

    this.x = x;
    this.y = y;

    const buttonBase = new PIXI.Sprite(
      PIXI.loader.resources[textureID].texture
    );
    this.addChild(buttonBase);
    
    const labelStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 28,
      fill: 0xFFFFFF,
      stroke: 0x202030,
      strokeThickness: 4,
      padding: 20
    });

    const label = new PIXI.Text(text, labelStyle);
    label.anchor.set(0.5);
    label.x = this.width / 2;
    label.y = this.height / 2;
    this.addChild(buttonBase);

    this.interactive = true;
    this.buttonMode = true;
    this.isDown = false;

    this.on('pointerdown', () => {
      this.isDown = true;
    });

    this.on('pointerup', () => {
      if (this.isDown) {
        this.isDown = false;
        onClick();
      }
    });
  }
}