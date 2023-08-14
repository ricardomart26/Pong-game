enum DIRECTIONS {
    IDLE = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4
};


const rounds: number[] = [5, 5, 3, 3, 2];
const colors: string[] = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];


// const getCanvasAndContext = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
//     let canvas: HTMLCanvasElement | null = document.querySelector('canvas');
//     if (!canvas)
//     throw new Error('Canvas not found');

// let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
// if (!context)
// throw new Error('Context not found');
//     return [canvas, context];
// }

// const [canvas, context] = getCanvasAndContext();

// canvas.width = 1400;
// canvas.height = 1000;
// canvas.style.width = (canvas.width / 2) + 'px';

class Canvas {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _paint: boolean;

    private _clickX: number[] = [];
    private _clickY: number[] = [];

    private _clickDrag: boolean[] = [];

    constructor() {
        let canvas = document.querySelector('canvas') as HTMLCanvasElement;

        let context = canvas.getContext('2d') as CanvasRenderingContext2D;

        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#ffffff';
        context.lineWidth = 1;

        this._canvas = canvas;
        this._context = context;

    };

    getCanvas(): HTMLCanvasElement {
        return this._canvas;
    };

    getContext(): CanvasRenderingContext2D {
        return this._context;
    };
}

// canvas.style.height = (canvas.height / 2) + 'px';

class Ball {
    width: number;
    height: number;
    x: number;
    y: number;
    moveX: DIRECTIONS;
    moveY: DIRECTIONS;
    speed: number;

    constructor(canvas: HTMLCanvasElement, incrementedSpeed: number) {
        this.width = 18;
        this.height = 18;
        this.x = (canvas.width / 2) - 9;
        this.y = (canvas.height / 2) - 9;
        this.moveX = DIRECTIONS.IDLE;
        this.moveY = DIRECTIONS.IDLE;
        this.speed = incrementedSpeed || 7;
    }    
}    

class Ai {
    width: number;
    height: number;
    x: number;
    y: number;
    move: DIRECTIONS;
    score: number;
    speed: number;
    color: string;

    constructor(canvas: HTMLCanvasElement, side: string) {
        if (!canvas) return;
        this.width = 18;
        this.height = 180;
        this.x = side === 'left' ? 150 : (canvas.width - 150);
        this.y = (canvas.height / 2) - 35;
        this.move = DIRECTIONS.IDLE;
        this.score = 0;
        this.speed = 8;
        this.color = 'green';
    }    

    build(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}    

class Game
{
    player: Ai;
    ai: Ai;
    ball: Ball;
    running: boolean;
    over: boolean;
    turn: Ai
    timer: number;
    round: number = 0;
    color: string;
    canvas: Canvas;
    
    constructor() {
        // this.ai.speed = 5;
        this.running = false;
        this.over = false;
        this.turn = this.ai; 
        this.timer = 0;
        this.round = 0;
        this.color = '#8c52ff';
        this.canvas = new Canvas();
    }    

    initialize(): void {
        console.log('initialize');
        this.ai.build(this.canvas.getContext());
    }    

    update(): void {

    }    
}    

let game = new Game();

game.initialize();