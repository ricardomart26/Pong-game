import { exit } from "process";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


/**
 * TODO:
 * 
 * - Perceber o porque de encravar as pazinhas
 * - Parte de baixo da pazinha não muda a direção da bola
 * - Como fazer para quando clicar espaço, só pressionar uma vez
 */
interface Object {
    x: number;
    y: number;
    color: string;
    height: number;
    name: string;
    width: number;
    score?: number;
    speed: number;
};

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const SPEED = 2.2;

const Canvas = () => {
    
    const params = useParams();
    console.log(params);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    let ctx: CanvasRenderingContext2D;
    const listKeys: string[] = [];
    let ball_direction_x: number = 1;
    let ball_direction_y: number = 1;
    // let curve: number = 0;
    let curve: number = 0;
    let idle: boolean = false;


    const players: Object[] = [{
        x: 30,
        y: CANVAS_HEIGHT / 2,
        color: 'yellow',
        height: 100,
        width: 15,
        name: "player",
        score: 0,
        speed: 3
    },
    {
        x: CANVAS_WIDTH - 40,
        y: CANVAS_HEIGHT / 2,
        color: 'red',
        height: 100,
        width: 15,
        name: "player2",
        score: 0,
        speed: 3
    },
    {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        color: 'black',
        height: 10,
        width: 10,
        name: "ball",
        speed: 2.2
    }];

    const reset_canvas = () => {
        players[2].x = CANVAS_WIDTH / 2;
        players[2].y = CANVAS_HEIGHT / 2;
        players[0].x = 30;
        players[0].y = CANVAS_WIDTH / 2;
        players[1].x = CANVAS_WIDTH - 40;
        players[1].y = CANVAS_WIDTH / 2;
        curve = 0;
        idle = true;
    }


    const check_score = () => {
        if (players[2].x > CANVAS_WIDTH)
        {

            if (players[0].score != undefined)
                players[0].score++;
            // console.log("Score: " + players[0].score);
            reset_canvas();
            if (players[0].score === 11)
                idle = true;
        }
        else if (players[2].x < 0)
        {
            if (players[1].score != undefined)
                players[1].score++;
            reset_canvas();
            if (players[1].score === 11)
                idle = true;

        }
    };

    const colision = (player: number): boolean => {
        return ((players[2].x >= players[player].x - players[player].width && players[2].x <= players[player].x + players[player].width)
            && (players[2].y >= players[player].y - (players[player].height / 2) && players[2].y <= players[player].y + (players[player].height / 2)))
    };


    const ai = (level: number) => {
        if (level === 1) {
            if (ball_direction_x == 1)
            {
               if (players[2].y >= players[1].y)
                    move(1, 1);
               else if (players[2].y <= players[1].y)
                    move(-1, 1);
            }
        }
        if (level === 2)
        {
            if (ball_direction_x == 1)
            {
               if (players[2].y >= players[1].y)
                    move(1, 1);
               else if (players[2].y <= players[1].y)
                    move(-1, 1);
            }   
        }
    }

    const move = (move: number, player: number) => {
        players[player].y += move * players[player].speed;
    }

    const handle_moves = () => {
        if (listKeys.includes('w'))
            move(-1, 0);
        else if (listKeys.includes('s'))
            move(1, 0);
        console.log('params ', params);
        console.log('params option', params["option"]);
        if (params["option"] === '1vs1off')
        {
           console.log('params ', params);

            if (listKeys.includes('ArrowUp'))
                move(-1, 1);
            else if (listKeys.includes('ArrowDown'))
                move(1, 1);
        }
    };

    const update = () => {

        players[2].x += players[2].speed * ball_direction_x;
        players[2].y += curve;

        if (colision(1) && ball_direction_x == 1)
        {
            // A bola está na metade de baixo, por isso a curva tem de ser positiva
            curve = (players[2].y > players[1].y ? ((players[2].y - players[1].y) / 10): curve);
            // A bola está na metade de cima, por isso a curva tem de ser positiva
            curve = (players[2].y < players[1].y ? ((players[1].y - players[2].y) / 10) * -1 : curve);
            ball_direction_x = -1;
        }
        else if (colision(0) && ball_direction_x == -1)
        {

            // A bola está na metade de baixo, por isso a curva tem de ser positiva
            curve = (players[2].y > players[0].y ? ((players[2].y - players[0].y) / 10): curve);
            // A bola está na metade de cima, por isso a curva tem de ser positiva
            curve = (players[2].y < players[0].y ? ((players[0].y - players[2].y) / 10) * -1 : curve);
            console.log(curve);
            ball_direction_x = 1;
        }
        
        if (players[2].y >= CANVAS_HEIGHT - (players[2].height || 0))
            curve *= -1;
        else if (players[2].y < 0 + (players[2].height || 0))
            curve *= -1;

        // Touch the end line, should increment score;
        check_score(); 
    }

    const renderObj = () => 
    {
        if (listKeys.includes(' '))
            idle = !idle;

        if (!idle)
            update();
    
        handle_moves();

        if (params["option"] === '1vspc')
            ai(1);



        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "30px Courier New";
        ctx.fillStyle = "red";
        ctx.fillText((players[0].score?.toString() || "0"), 30, 50);
        ctx.fillText((players[1].score?.toString() || "0"), CANVAS_WIDTH - 40, 50);
        players.forEach(player => {
            ctx.fillStyle = player.color;
            if (player.y <= (player.height / 2))
                player.y = (player.height / 2);
            else if (player.y >= CANVAS_HEIGHT - (player.height / 2))
                player.y = CANVAS_HEIGHT - (player.height / 2);
            if (player.name === "ball")
            {
                ctx.beginPath();
                ctx.fillStyle = player.color;
                ctx.arc(player.x, player.y, player.height, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }
            else
                ctx.fillRect(player.x, player.y - player.height / 2, player.width, player.height);
        });

        if (idle)
        {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillRect(CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT / 2 - 50, 300, 100);
            ctx.fillStyle = 'red';
            ctx.font = '30px sans-serif bold';
            ctx.fillText("PAUSED GAME", CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 + 10);
        }

        requestAnimationFrame(renderObj);

    }

    const init = () => {
        ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!listKeys.includes(e.key))
                listKeys.push(e.key);
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
           listKeys.splice(listKeys.indexOf(e.key), 1);
        });
        renderObj();
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    );
}

export default Canvas;