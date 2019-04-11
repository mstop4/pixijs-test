import * as PIXI from 'pixi.js';
import 'pixi-display';
import { TitleScreen } from './scenes/titleScreen';
import { CardDemo } from './scenes/cardDemo';
import { TextDemo } from './scenes/textDemo';

class Game {
  constructor() {
    this.fpsCounter = null;
    this.app = null;
    this.uiLayer = null;
    this.currentScene = null;

    this.baseWidth = 720;
    this.baseHeight = 1280;

    this.sceneFactory = {
      'TitleScreen': TitleScreen,
      'CardDemo': CardDemo,
      'TextDemo': TextDemo
    };

    this.changeScene = this.changeScene.bind(this);

    const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
    PIXI.utils.sayHello(type);
    
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    });

    document.body.appendChild(this.app.view);
    window.addEventListener('resize', this.scaleSceneToWindow.bind(this), false);
  
    this.app.stage.displayList = new PIXI.DisplayList();
    this.uiLayer = new PIXI.DisplayGroup(2, false);

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
      .add('img/cards.json')
      .load(() => this.changeScene('TitleScreen'));
  }

  changeScene(sceneName) {
    if (this.currentScene) {
      this.currentScene.cleanup();
      this.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy({
        children: true
      });
    }

    if (sceneName in this.sceneFactory) {
      this.currentScene = new this.sceneFactory[sceneName](this);
      this.currentScene.updateSize();
      this.app.stage.addChild(this.currentScene);
    }
  }

  scaleSceneToWindow() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    if (this.currentScene) {
      this.currentScene.updateSize();
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

const game = new Game();
export default game;