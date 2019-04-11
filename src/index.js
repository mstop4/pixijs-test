import * as PIXI from 'pixi.js';
import 'pixi-display';
import { TitleScreen } from './js/scenes/titleScreen';
import { CardDemo } from './js/scenes/cardDemo';

let currentScene = null;
let fpsCounter;
let app;
let uiLayer;

const initApp = () => {
  const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
  PIXI.utils.sayHello(type);
  
  app = new PIXI.Application({
    width: 720, 
    height: 720
  });
  document.body.appendChild(app.view);

  app.stage.displayList = new PIXI.DisplayList();
  uiLayer = new PIXI.DisplayGroup(1, false);

  initFpsCounter();
};

const initFpsCounter = () => {
  const fpsStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 'white'
  });

  fpsCounter = new PIXI.Text('0', fpsStyle);
  fpsCounter.displayGroup = uiLayer;
  app.stage.addChild(fpsCounter);
};

const loadResources = () => {
  PIXI.loader
    .add('img/felt.png')
    .load(loadScene);
};

const loadScene = () => {
  currentScene = new TitleScreen(app);
  startGameLoop();
};

const startGameLoop = () => {
  app.ticker.add(delta => {
    if (currentScene) {
      currentScene.process(delta);
    }

    fpsCounter.text = app.ticker.FPS;
  });
};

initApp();
loadResources();