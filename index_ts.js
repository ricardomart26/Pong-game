var DIRECTIONS;
(function (DIRECTIONS) {
    DIRECTIONS[DIRECTIONS["IDLE"] = 0] = "IDLE";
    DIRECTIONS[DIRECTIONS["UP"] = 1] = "UP";
    DIRECTIONS[DIRECTIONS["DOWN"] = 2] = "DOWN";
    DIRECTIONS[DIRECTIONS["LEFT"] = 3] = "LEFT";
    DIRECTIONS[DIRECTIONS["RIGHT"] = 4] = "RIGHT";
})(DIRECTIONS || (DIRECTIONS = {}));
;
var rounds = [5, 5, 3, 3, 2];
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];
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
var Canvas = /** @class */ (function () {
    function Canvas() {
        this._clickX = [];
        this._clickY = [];
        this._clickDrag = [];
        var canvas = document.querySelector('canvas');
        var context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#ffffff';
        context.lineWidth = 1;
        this._canvas = canvas;
        this._context = context;
    }
    ;
    Canvas.prototype.getCanvas = function () {
        return this._canvas;
    };
    ;
    Canvas.prototype.getContext = function () {
        return this._context;
    };
    ;
    return Canvas;
}());
// canvas.style.height = (canvas.height / 2) + 'px';
var Ball = /** @class */ (function () {
    function Ball(canvas, incrementedSpeed) {
        this.width = 18;
        this.height = 18;
        this.x = (canvas.width / 2) - 9;
        this.y = (canvas.height / 2) - 9;
        this.moveX = DIRECTIONS.IDLE;
        this.moveY = DIRECTIONS.IDLE;
        this.speed = incrementedSpeed || 7;
    }
    return Ball;
}());
var Ai = /** @class */ (function () {
    function Ai(canvas, side) {
        if (!canvas)
            return;
        this.width = 18;
        this.height = 180;
        this.x = side === 'left' ? 150 : (canvas.width - 150);
        this.y = (canvas.height / 2) - 35;
        this.move = DIRECTIONS.IDLE;
        this.score = 0;
        this.speed = 8;
        this.color = 'green';
    }
    Ai.prototype.build = function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    return Ai;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.round = 0;
        // this.ai.speed = 5;
        this.running = false;
        this.over = false;
        this.turn = this.ai;
        this.timer = 0;
        this.round = 0;
        this.color = '#8c52ff';
        this.canvas = new Canvas();
    }
    Game.prototype.initialize = function () {
        console.log('initialize');
        this.ai.build(this.canvas.getContext());
    };
    Game.prototype.update = function () {
    };
    return Game;
}());
var game = new Game();
game.initialize();
