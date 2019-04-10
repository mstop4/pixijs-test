import { listThings } from './js/helloworld';
import * as PIXI from 'pixi.js';

let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}

PIXI.utils.sayHello(type);

listThings([1, 2, 3, 4, 5]);