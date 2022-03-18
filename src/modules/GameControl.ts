import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

export default class GameControl {
    food: Food;
    scorePanel: ScorePanel;
    snake: Snake;
    direction: string = '';
    isLive = true;
    key = new Set(["ArrowUp","Up","ArrowDown","Down","ArrowLeft","Left","ArrowRight","Right"])

    keyDownHandler = (evt: KeyboardEvent) => {
        //Only arrow key can change snake forward direction
        this.direction = this.key.has(evt.key)? evt.key: this.direction;
    }
    constructor() {
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.snake = new Snake();

        this.init()
    }

    init() {
        document.addEventListener('keydown', this.keyDownHandler)
        this.run()
    }

    run() {
        let x = this.snake.X
        let y = this.snake.Y
        // set the pos of snake head according to direction
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                y -= 10
                break;
            case "ArrowDown":
            case "Down":
                y += 10
                break;
            case "ArrowLeft":
            case "Left":
                x -= 10
                break;
            case "ArrowRight":
            case "Right":
                x += 10
                break;
        }

        this.checkEat(x, y);

        try {
            this.snake.X = x
            this.snake.Y = y
        }catch(e: unknown){
            //using exception to deal with hitting border and hitting itself scenario
            alert((e as Error).message + ' Game over!');
            this.isLive = false;
            if (window.confirm("Do you really want to restart game?")) {
                location.reload();
              }
            // if (e instanceof Error){
            //     alert(e.message + ' Game over!');
            // }
            
        }
        // accelerate speed according to game level
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.getLevel() - 1) * 30);
    }
    // whether snake can eat food
    checkEat(x:number, y:number){
        if (x === this.food.X && y === this.food.Y){
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}