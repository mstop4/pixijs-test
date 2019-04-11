import * as PIXI from 'pixi.js';
import 'pixi-display';
import { TitleScreen } from './scenes/titleScreen';
import { CardDemo } from './scenes/cardDemo';

export class Game {
  constructor() {
    this.fpsCounter = null;
    this.app = null;
    this.uiLayer = null;
    this.currentScene = null;

    this.sceneFactory = {
      'TitleScreen': TitleScreen,
      'CardDemo': CardDemo
    };

    this.changeScene = this.changeScene.bind(this);

    const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
    PIXI.utils.sayHello(type);
    
    this.app = new PIXI.Application({
      width: 720, 
      height: 720
    });
    document.body.appendChild(this.app.view);
  
    this.app.stage.displayList = new PIXI.DisplayList();
    this.uiLayer = new PIXI.DisplayGroup(1, false);

    this.initFpsCounter();
  }

  initFpsCounter() {
    const fpsStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'white'
    });
  
    this.fpsCounter = new PIXI.Text('0', fpsStyle);
    this.fpsCounter.displayGroup = this.uiLayer;
    this.app.stage.addChild(this.fpsCounter);
  }

  loadResources() {
    PIXI.loader
      .add('img/felt.png')
      .load(() => this.changeScene('TitleScreen'));
  }

  changeScene(sceneName) {
    if (this.currentScene) {
      this.currentScene.destroy();
    }

    if (sceneName in this.sceneFactory) {
      this.currentScene = new this.sceneFactory[sceneName](this);
    }
  }

  startGameLoop() {
    this.app.ticker.add(delta => {
      if (this.currentScene) {
        this.currentScene.process(delta);
      }
  
      this.fpsCounter.text = this.app.ticker.FPS;
    });
  }
}