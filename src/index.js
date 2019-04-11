import game from './js/game';
import './index.css';

console.log(window.innerWidth, document.documentElement.clientWidth);

game.loadResources();
game.startGameLoop();