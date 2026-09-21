import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;


const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('pipes')
export class pipes extends Component {
    

    @property({
        type: Node,
        tooltip: 'Top pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom pipe'
    })
    public bottomPipe: Node;

    public startLocalUp: Vec3 = new Vec3(0,0,0);
    public startLocalDown: Vec3 = new Vec3(0,0,0);
    public scene = screen.windowSize;

    public game;
    public pipeSpeed: number = 300;
    public tempSpeed: number;

    isPassed: boolean;

    onLoad(){
        //this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPassed = false;
        this.game = find("gameCtrl").getComponent("gameCtrl");
    }

    initPos(){

        this.startLocalUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.startLocalDown.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);

        let gap = random(90, 100);
        let topHeight = random(0, 450);

        this.startLocalUp.y = topHeight;
        this.startLocalDown.y = (topHeight - (gap * 10))

        this.bottomPipe.setPosition(this.startLocalDown);
        this.topPipe.setPosition(this.startLocalUp);
    }

    update(deltaTime : number){
        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.startLocalDown = this.bottomPipe.position
        this.startLocalUp = this.topPipe.position;

        this.startLocalDown.x -= this.tempSpeed;
        this.startLocalUp.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.startLocalDown);
        this.topPipe.setPosition(this.startLocalUp);

        if (this.isPassed == false && this.topPipe.position.x <= 0) {
            this.isPassed = true;
            this.game.passPipe();
        }

        if (this.topPipe.position.x < (0 - this.scene.width)){
            this.game.createPipe();
            this.destroy();
        }
    }
}


