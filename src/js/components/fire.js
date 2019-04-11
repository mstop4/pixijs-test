import * as PIXI from 'pixi.js';
import { Emitter } from 'pixi-particles';

export class Fire extends PIXI.Container {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;

    const spriteSheet = PIXI.loader.resources['img/cards.json'];

    this.emitter = new Emitter(
      this,
      [spriteSheet.textures['particle.png']],

      {
        'alpha': {
          'start': 1,
          'end': 0
        },
        'scale': {
          'start': 2,
          'end': 1,
          'minimumScaleMultiplier': 1
        },
        'color': {
          'start': '#ff8000',
          'end': '#ff0000'
        },
        'speed': {
          'start': 100,
          'end': 100,
          'minimumSpeedMultiplier': 1
        },
        'acceleration': {
          'x': 0,
          'y': -1500
        },
        'maxSpeed': 250,
        'startRotation': {
          'min': 120,
          'max': 60
        },
        'noRotation': false,
        'rotationSpeed': {
          'min': 0,
          'max': 0
        },
        'lifetime': {
          'min': 0.7,
          'max': 0.7
        },
        'blendMode': 'screen',
        'frequency': 0.075,
        'emitterLifetime': -1,
        'maxParticles': 10,
        'pos': {
          'x': 0,
          'y': 0
        },
        'addAtBack': false,
        'spawnType': 'circle',
        'spawnCircle': {
          'x': 0,
          'y': 0,
          'r': 2
        }
      }
    );

    this.emitter.emit = true;
  }

  process(delta) {
    this.emitter.update(delta * 0.01);
  }
}