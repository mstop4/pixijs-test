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
      .load(() => this.changeScene('TitleScreen'));
  }

  changeScene(sceneName) {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy({
        children: true
      });
    }

    if (sceneName in this.sceneFactory) {
      this.currentScene = new this.sceneFactory[sceneName](this);
      this.app.stage.addChild(this.currentScene);
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