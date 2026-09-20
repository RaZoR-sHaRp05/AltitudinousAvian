import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('results')
export class results extends Component {
   

    @property({
        type: Label
    })
    public scoreLabel: Label;

     @property({
        type: Label
    })
    public highLabel: Label;

     @property({
        type: Label
    })
    public resultEnd: Label;

    maxScore: number = 0;
    currentScore: number = 0;

    updateScore(num:number){
        this.currentScore = num;

        this.scoreLabel.string = '' + this.currentScore;
    }

    resetScore(){
        this.updateScore(0);

        this.hideResults();
    }

    addScore(){
        this.updateScore(this.currentScore + 1);
    }

    showResults(){
        this.maxScore = Math.max(this.maxScore, this.currentScore);

        this.highLabel.string = 'High Score: ' + this.maxScore;

        this.highLabel.node.active = true;
        this.resultEnd.node.active = true;
    }

    hideResults(){
        this.highLabel.node.active = false;
        this.resultEnd.node.active = false;
    }
}


