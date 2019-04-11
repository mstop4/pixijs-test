import * as PIXI from 'pixi.js';
import { emoteTextures } from '../manifests/mixedTextEmotes';

export class MixedText extends PIXI.Container {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;

    this.textElements = [];
    this.sprites = [];
    this.textObjects = [];

    this.numSpritesUsed = 0;
    this.numTextObjectsUsed = 0;

    this.fontStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 72,
      fill: 'white'
    });

    this.elementPadding = 10;
  }

  updateText(textElements, fontSize) {
    let cursorX = 0;

    this.cacheAsBitmap = false;

    this.sprites.forEach(sprite => sprite.visible = false);
    this.textObjects.forEach(text => text.visible = false);

    this.numSpritesUsed = 0;
    this.numTextObjectsUsed = 0;

    this.fontStyle.fontSize = fontSize;

    textElements.forEach(elem => {

      if (typeof elem === 'string') {
        let curTextObj;
        
        if (this.numTextObjectsUsed < this.textObjects.length) {
          curTextObj = this.textObjects[this.numTextObjectsUsed];
        }

        else {
          curTextObj = new PIXI.Text('Hi', this.fontStyle);
          this.addChild(curTextObj);
        }

        curTextObj.text = elem;
        curTextObj.style = this.fontStyle;
        curTextObj.x = cursorX;
        curTextObj.visible = true;

        const textMetrics = PIXI.TextMetrics.measureText(elem, this.fontStyle);
        cursorX += textMetrics.width + this.elementPadding;
        this.numTextObjectsUsed++;
      }

      else if (typeof elem === 'number') {
        let curSprite;
        
        if (this.numSpritesUsed < this.sprites.length) {
          curSprite = this.sprites[this.numSpritesUsed];
        }

        else {
          curSprite = new PIXI.Sprite();
          this.addChild(curSprite);
        }

        const texture = emoteTextures[elem];
        curSprite.texture = PIXI.utils.TextureCache[texture];
        curSprite.x = cursorX;
        curSprite.visible = true;

        cursorX += curSprite.width + this.elementPadding;
        this.numSpritesUsed++;
      }

    });

    //this.cacheAsBitmap = true;
  }
}