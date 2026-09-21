import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { groundMovement } from './groundMovement';
import { results } from './results';
import { bird } from './bird';
import { PipePool } from './PipePool';
import { birdAudio } from './birdAudio';

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
        type: bird
    })
    public bird: bird;

    @property({
        type:PipePool
    })
    public pipeQueue: PipePool

    @property({
        type:birdAudio
    })
    public clip: birdAudio;

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 300;
    public isOver: boolean;

    onLoad(){
        this.initListener();

        this.result.resetScore();

        this.isOver = true;

        director.pause();
    }

    initListener(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {

            if (this.isOver == true){
                this.resetGame();
                this.bird.resetBird();
                this.startGame();

            }
            
            if (this.isOver == false) {
                this.bird.fly();
                this.clip.onAudioQueue(0);
            }
        })
    }

    onKeyDown(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.gameOver();
            break;
            case KeyCode.KEY_P:
                this.createPipe();
            break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
        }
    }

    startGame(){
        this.result.hideResults();
        director.resume();
        this.schedule(this.createPipe, 3);
    }

    gameOver(){
        this.result.showResults();
        this.isOver = true;
        this.clip.onAudioQueue(3);
        director.pause();
    }

    resetGame(){
        this.result.resetScore();
        this.pipeQueue.reset();
        this.bird.hitSomething = false;
        this.isOver = false;
        this.startGame();
    }

    passPipe(){
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }

    createPipe(){
        this.pipeQueue.addPool();
    }

    contactGroundPipe(){
        let collider = this.bird.getComponent(Collider2D);

        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck(){
        this.contactGroundPipe();

        if (this.bird.hitSomething == true) {
            this.gameOver();
        }
    }

    update(){

        if (this.isOver == false){
            this.birdStruck();
        }
    }
}


