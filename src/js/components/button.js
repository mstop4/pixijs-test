import * as PIXI from 'pixi.js';

export class Button extends PIXI.Container {
  constructor(x, y, text, onClick) {
    super();

    this.x = x;
    this.y = y;

    const spriteSheet = PIXI.loader.resources['img/cards.json'];

    const buttonBase = new PIXI.Sprite(
      spriteSheet.textures['button.png']
    );
    this.addChild(buttonBase);
    
    const labelStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 0xFFFFFF,
      stroke: 0x202030,
      strokeThickness: 4,
      padding: 20
    });

    const label = new PIXI.Text(text, labelStyle);
    label.anchor.set(0.5);
    label.x = this.width / 2;
    label.y = this.height / 2;
    this.addChild(label);

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