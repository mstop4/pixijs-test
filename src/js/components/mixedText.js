import * as PIXI from 'pixi.js';
import { emoteTextures } from '../manifests/mixedTextEmotes';

export class MixedText extends PIXI.Container {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;

    // Pool of Sprite and Text objects
    this.sprites = [];
    this.textObjects = [];
    this.numSpritesUsed = 0;
    this.numTextObjectsUsed = 0;

    this.maxWidth = 600;

    this.fontStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 72,
      fill: 'white'
    });

    this.elementPadding = 10;
    this.lineSpacing = 10;
  }

  updateText(textElements, fontSize) {
    this.cacheAsBitmap = false;

    let cursorX = 0;
    let cursorY = 0;
    this.numSpritesUsed = 0;
    this.numTextObjectsUsed = 0;
    this.fontStyle.fontSize = fontSize;

    this.sprites.forEach(sprite => sprite.visible = false);
    this.textObjects.forEach(text => text.visible = false);

    textElements.forEach(elem => {

      // Text
      if (typeof elem === 'string') {
        let curTextObj;

        if (this.numTextObjectsUsed < this.textObjects.length) {
          curTextObj = this.textObjects[this.numTextObjectsUsed];
        }

        else {
          curTextObj = new PIXI.Text('', this.fontStyle);
          this.textObjects.push(curTextObj);
          this.addChild(curTextObj);
        }

        curTextObj.style = this.fontStyle;
        curTextObj.visible = true;

        const words = elem.split(' ');
        let buffer = '';

        words.forEach((word, i) => {
          const textMetrics = PIXI.TextMetrics.measureText(buffer + word, this.fontStyle);

          if (cursorX + textMetrics.width > this.maxWidth) {
            curTextObj.text = buffer;
            curTextObj.x = cursorX;
            curTextObj.y = cursorY;

            buffer = '';
            cursorX = 0;
            cursorY += fontSize + this.lineSpacing;
            this.numTextObjectsUsed++;

            // Grab new Text object
            if (this.numTextObjectsUsed < this.textObjects.length) {
              curTextObj = this.textObjects[this.numTextObjectsUsed];
            }

            else {
              curTextObj = new PIXI.Text('', this.fontStyle);
              this.textObjects.push(curTextObj);
              this.addChild(curTextObj);
            }

            curTextObj.style = this.fontStyle;
            curTextObj.visible = true;
          }

          else {
            buffer += word;
            if (i != words.length + 1) {
              buffer += ' ';
            }
          }
        });

        curTextObj.text = buffer;
        curTextObj.x = cursorX;
        curTextObj.y = cursorY;
        const textMetrics = PIXI.TextMetrics.measureText(buffer, this.fontStyle);
        cursorX += textMetrics.width + this.elementPadding;
        buffer = '';
        this.numTextObjectsUsed++;
      }

      // Emote Id
      else if (typeof elem === 'number') {
        let curSprite;

        if (this.numSpritesUsed < this.sprites.length) {
          curSprite = this.sprites[this.numSpritesUsed];
        }

        else {
          curSprite = new PIXI.Sprite();
          this.sprites.push(curSprite);
          this.addChild(curSprite);
        }

        const texture = emoteTextures[elem];
        curSprite.texture = PIXI.utils.TextureCache[texture];
        curSprite.visible = true;

        const newScale = fontSize / curSprite.texture.height;
        curSprite.scale = new PIXI.Point(newScale, newScale);

        const newCursorX = cursorX + curSprite.width + this.elementPadding;

        if (newCursorX > this.maxWidth) {
          cursorX = 0;
          cursorY += fontSize + this.lineSpacing;
          curSprite.x = cursorX;
          curSprite.y = cursorY;
        }

        else {
          curSprite.x = cursorX;
          curSprite.y = cursorY;
          cursorX = newCursorX;
        }

        this.numSpritesUsed++;
      }
    });

    this.cacheAsBitmap = true;
  }
}