import { listThings } from './js/helloworld';
import * as PIXI from 'pixi.js';

listThings([1, 2, 3, 4, 5]);

let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);

app.view.requestFullscreen();