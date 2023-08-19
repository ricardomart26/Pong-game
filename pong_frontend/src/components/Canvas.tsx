import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Object } from "../interfaces/Object";
import { Button } from "@mui/material";

/**
 * TODO:
 * 
 * - Perceber o porque de encravar as pazinhas
 * - Parte de baixo da pazinha não muda a direção da bola
 * - Como fazer para quando clicar espaço, só pressionar uma vez
 * - Ver como o fazer o resize com o canvas https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
 * - Max speed da bola
 * - Perceber porque bater nas pontas a bola vai a direito?
 */


const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const BALL_SPEED = 4;
const INCREMENT_SPEED = 0.3;

const PLAYER_SPEED = 6;
// const BALL_SPEED = 2.2;
// const BALL_SPEED = 2.2;



const useKeysPress = (): string[] => {
    const [pressedKeys, setPressedKeys] = useState<string[]>([]);


    const onKeyDown = (e: KeyboardEvent) => {
        if (!pressedKeys.includes(e.key))
            setPressedKeys([...pressedKeys, e.key]);
    }

    const onKeyUp = (e: KeyboardEvent) => {
        setPressedKeys(pressedKeys.splice(pressedKeys.indexOf(e.key), 1));
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp);
        
        return () => {
            window.removeEventListener("keydown", (onKeyDown))
            window.removeEventListener("keyup", (onKeyUp))
        }
    }, [pressedKeys]);
    
    return pressedKeys;
} 


const players: Object[] = [{
    x: 30,
    y: CANVAS_HEIGHT / 2,
    color: 'yellow',
    height: 100,
    width: 15,
    name: "player",
    score: 0,
    speed: PLAYER_SPEED
},
{
    x: CANVAS_WIDTH - 40,
    y: CANVAS_HEIGHT / 2,
    color: 'red',
    height: 100,
    width: 15,
    name: "player2",
    score: 0,
    speed: PLAYER_SPEED
}];

let ball: Object = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    color: 'black',
    height: 10,
    width: 10,
    name: "ball",
    speed: BALL_SPEED
}


const Canvas = ({changeKeys, scoreToWin}: {changeKeys: (activate: boolean) => void, scoreToWin: number}) => {
    
    const params = useParams();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [idle, setIdle] = useState(false); // Add idle state
    // const pressedKeys: string[] = [];
    const pressedKeys: string[] = useKeysPress();

    let winner: Object;

    let ctx: CanvasRenderingContext2D;
    let ballDirectionX: number = 1;
    // let finish: boolean = false;
    const [finished, setFinished] = useState(false);
    let curve: number = 0;
    let idle: boolean = false;

    const resetCanvas = () => {
        ball.x = CANVAS_WIDTH / 2;
        ball.y = CANVAS_HEIGHT / 2;
        ball.speed = BALL_SPEED
        players[0].x = 30;
        players[0].y = CANVAS_WIDTH / 2;
        players[1].x = CANVAS_WIDTH - 40;
        players[1].y = CANVAS_WIDTH / 2;
        curve = 0;
        idle = false;
    }


    const writeScore = () => {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "30px Courier New";
        ctx.fillStyle = "red";
        ctx.fillText((players[0].score?.toString() || "0"), 30, 50);
        ctx.fillText((players[1].score?.toString() || "0"), CANVAS_WIDTH - 40, 50);
    }

    const drawPlayers = () => {
        players.forEach(player => {
            ctx.fillStyle = player.color;
            if (player.y <= (player.height / 2))
                player.y = (player.height / 2);
            else if (player.y >= CANVAS_HEIGHT - (player.height / 2))
                player.y = CANVAS_HEIGHT - (player.height / 2);
            ctx.fillRect(player.x, player.y - player.height / 2, player.width, player.height);
        });
        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x, ball.y, ball.height, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    const checkScore = (player: Object) => {
        if (player.score != undefined)
            player.score++;
        resetCanvas();
        if (player.score === scoreToWin)
        {
            winner = player;
            setFinished(true);
        }
    };


    const colision = (player: number): boolean => {
        return ((ball.x >= players[player].x - players[player].width && ball.x <= players[player].x + players[player].width + 10)
            && (ball.y >= players[player].y - (players[player].height / 2) && ball.y <= players[player].y + (players[player].height / 2)))
    };


    const ai = (level: number) => {
        if (level === 1) {
            if (ballDirectionX == 1)
            {
               if (ball.y >= players[1].y)
                    move(1, 1);
               else if (ball.y <= players[1].y)
                    move(-1, 1);
            }
        }
        if (level === 2)
        {
            if (ballDirectionX == 1)
            {
               if (ball.y >= players[1].y)
                    move(1, 1);
               else if (ball.y <= players[1].y)
                    move(-1, 1);
            }   
        }
    }

    const move = (move: number, player: number) => {
        players[player].y += move * players[player].speed;
    }

    const handleMoves = () => {
        if (pressedKeys.includes('w'))
            move(-1, 0);
        else if (pressedKeys.includes('s'))
            move(1, 0);
        if (params["option"] === '1vs1off')
        {
            if (pressedKeys.includes('ArrowUp'))
                move(-1, 1);
            else if (pressedKeys.includes('ArrowDown'))
                move(1, 1);
        }
    };

    // const checkColision = (player: Object, playerIndex: number, ballDirectionX: number) => {
    //     console.log('player name', player.name);
    //     console.log('ballDirectionX', ballDirectionX);
    //     console.log('player index:', playerIndex);
    //     if (colision(playerIndex) && ballDirectionX == 1)
    //     {
    //         // A bola está na metade de baixo, por isso a curva tem de ser positiva
    //         curve = (ball.y > players[0].y ? ((ball.y - players[0].y) / 10): curve);
    //         // A bola está na metade de cima, por isso a curva tem de ser positiva
    //         curve = (ball.y < players[0].y ? ((players[0].y - ball.y) / 10) * -1 : curve);
    //         ballDirectionX = -1;
    //         counter++;
    //     }
    // }

    const updateGame = () => {

        ball.x += ball.speed * ballDirectionX;
        ball.y += curve;

        // players.map((player, index) => {
        //     checkColision(player, index ^ 1, ballDirectionX);

        // })
        if (colision(1))
        {
            if (ball.y > players[1].y)
                curve = ((ball.y - players[1].y) / 10)
            else if (ball.y < players[1].y)
                curve = ((players[1].y - ball.y) / 10) * -1
            ballDirectionX = -1;
            if (ball.speed < 10)
                ball.speed += INCREMENT_SPEED;
        }
        else if (colision(0))
        {

            // A bola está na metade de baixo, por isso a curva tem de ser positiva
            if (ball.y > players[0].y)
                curve = ((ball.y - players[0].y) / 10);
            else if (ball.y < players[0].y)
                curve = ((players[0].y - ball.y) / 10) * -1;
            // curve = (ball.y > players[0].y ? : curve);
            // // A bola está na metade de cima, por isso a curva tem de ser positiva
            // curve = (ball.y < players[0].y ?  * -1 : curve);
            ballDirectionX = 1;
            if (ball.speed < 10)
                ball.speed += INCREMENT_SPEED;
        }
        

        if ((ball.y >= CANVAS_HEIGHT - (ball.height || 0)) || (ball.y < 0 + (ball.height || 0)))
            curve *= -1;

        // Touch the end line, should increment score;
        if (ball.x > CANVAS_WIDTH)
            checkScore(players[0]);
        else if (ball.x < 0)
            checkScore(players[1]);
    };
    
    const gameLoop = () => 
    {
        if (!idle && !finished)
        {
            updateGame();
            handleMoves();

            if (params["option"] === '1vspc')
                ai(1);
            writeScore();
            drawPlayers();
            requestAnimationFrame(gameLoop);
        } 
        else if (idle)
        {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillRect(CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT / 2 - 50, 400, 100);
            ctx.fillStyle = 'red';
            ctx.font = '30px sans-serif bold';
            ctx.fillText("PAUSED GAME", CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 + 10);
        } 
        else if (finished) 
        {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillRect(CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT / 2 - 50, 400, 100);
            ctx.fillStyle = 'red';
            ctx.font = '30px sans-serif bold';
            ctx.fillText("WINNER IS " + winner.name, CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 + 10);
        }
    }


    const onKeyDown = (e: KeyboardEvent) => {
        if (!pressedKeys.includes(e.key))
            pressedKeys.push(e.key);
        if (pressedKeys.includes(' '))
        {
            idle = !idle;
            if (!idle)
                gameLoop();
        }
    }

    const onKeyUp = (e: KeyboardEvent) => {
            // console.log("key released", pressedKeys);
            pressedKeys.splice(pressedKeys.indexOf(e.key), 1);
    }

    useEffect(() => {
        ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp);
        gameLoop();
    }, []);

    return (
        <div>
            {scoreToWin && <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>}
            {/* {finished && <Button onClick={(e: React.MouseEvent) => {
                setFinished(false);
            }}> Play again </Button>} */}
        </div>
    );
}

export default Canvas;