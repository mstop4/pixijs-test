import * as PIXI from 'pixi.js';
import Stats from 'stats-js';

const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

const animate = () => {
  stats.begin();
  stats.end();
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

const cards = [];

const setup = () => {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      const sprite = new PIXI.Sprite(
        PIXI.loader.resources['img/felt.png'].texture
      );

      sprite.x = i * 64;
      sprite.y = j * 64;

      cards.push(sprite);
      app.stage.addChild(sprite);
    }
  }
};

let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({ width: 720, height: 720 });
document.body.appendChild(app.view);

PIXI.loader
  .add('img/felt.png')
  .load(setup);