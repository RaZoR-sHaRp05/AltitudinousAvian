import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director } from 'cc';
const { ccclass, property } = _decorator;

import { groundMovement } from './groundMovement';
import { results } from './results';

@ccclass('gameCtrl')
export class gameCtrl extends Component {
   
    @property({
        type: groundMovement,
        tooltip: 'This is the ground'
    })
    public ground: groundMovement;

    @property({
        type: results,
        tooltip: 'Results go here'
    })
    public result: results

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 300;

    onLoad(){
        this.initListener();

        this.result.resetScore();

        director.pause();
    }

    initListener(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.gameOver();
            break;
            case KeyCode.KEY_P:
                this.result.addScore();
            break;
            case KeyCode.KEY_Q:
                this.resetGame();
        }
    }

    startGame(){
        this.result.hideResults();
        director.resume();
    }

    gameOver(){
        this.result.showResults();
        director.pause();
    }

    resetGame(){
        this.result.resetScore();
        this.startGame();
    }
}


