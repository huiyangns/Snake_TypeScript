export default class ScorePanel {
    private score: number = 0;
    private level: number = 1;

    score_level:number; //score threshold. Achieving it can level up
    max_level:number; // max level setting
    scoreSpan:HTMLElement;
    levelSpan:HTMLElement;

    constructor(score_level:number=10, max_level:number=10){
        this.score_level = score_level;
        this.max_level = max_level
        this.scoreSpan = document.getElementById('score')!;
        this.levelSpan = document.getElementById('level')!;
    }

    addScore(){
        this.scoreSpan.innerHTML = ++this.score + '';
        if (this.score % this.score_level === 0){
            this.levelUp()
        }
    }

    levelUp(){
        if (this.level < this.max_level) {
            this.levelSpan.innerHTML = ++this.level + '';
        }
    }

    getLevel(){
        return this.level
    }
}