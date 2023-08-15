import { exit } from "process";
import { useEffect, useRef, useState } from "react";



/**
 * TODO:
 * 
 * - Meter o texto direito do score mais para a esquerda
 * - Perceber o porque de encravar as pazinhas
 * - Parte de baixo da pazinha não muda a direção da bola
 * - Meter as pazinhas no meio depois do score
 * 
 */
interface Object {
    x: number;
    y: number;
    color: string;
    height: number;
    name: string;
    width: number;
    score?: number;
};

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const SPEED = 2.2;

const Canvas = () => {
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
        height: 70,
        width: 10,
        name: "player",
        score: 0
    },
    {
        x: CANVAS_WIDTH - 40,
        y: CANVAS_HEIGHT / 2,
        color: 'red',
        height: 70,
        width: 10,
        name: "player2",
        score: 0
    },
    {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        color: 'black',
        height: 10,
        width: 10,
        name: "ball"
    }];


    const check_score = () => {
        if (players[2].x > CANVAS_WIDTH)
        {
            if (players[0].score != undefined)
                players[0].score++;
            console.log("Score: " + players[0].score);
            players[2].x = CANVAS_WIDTH / 2;
            players[2].y = CANVAS_HEIGHT / 2;
            curve = 0;
            if (players[0].score === 11)
                idle = true;
        }
        else if (players[2].x < 0)
        {
            if (players[1].score != undefined)
                players[1].score++;
            players[2].x = CANVAS_WIDTH / 2;
            players[2].y = CANVAS_HEIGHT / 2;
            curve = 0;
            if (players[1].score === 11)
                idle = true;

        }
    };

    const colision = (player: number): boolean => {
        return ((players[2].x >= players[player].x - 10 && players[2].x <= players[player].x + 10)
            && (players[2].y >= players[player].y - 35 && players[2].y <= players[player].y + 35))
    };

    const move = (move: number, player: number) => {
        players[player].y += move * SPEED;
    }


    const handle_moves = () => {
        if (listKeys.includes('w'))
            move(-1, 0);
        else if (listKeys.includes('s'))
            move(1, 0);
        if (listKeys.includes('ArrowUp'))
            move(-1, 1);
        else if (listKeys.includes('ArrowDown'))
            move(1, 1);
    };

    const update = () => {

        handle_moves();

        players[2].x += SPEED * ball_direction_x;
        if (curve != 0)
            players[2].y += (1.0 + curve) * ball_direction_y;
        // console.log("players y: ", players[2].y, " curve: ", curve);
        // console.log("ball direction x: ", ball_direction_x, " : ", ball_direction_y);


        if (ball_direction_x == 1 && colision(1))
        {
            curve = (players[2].y > players[1].y ? players[2].y - players[1].y : 0);
            curve = (players[2].y < players[1].y ? players[1].y - players[2].y : 0);
            while (curve > 10)
                curve = (curve / 10);
            // console.log("curve: ", curve);
            ball_direction_x = -1;
        }
        else if (ball_direction_x == -1 && colision(0))
        {
            curve = (players[2].y > players[0].y ? players[2].y - players[0].y : 0);
            curve = (players[2].y < players[0].y ? players[0].y - players[2].y : 0);
            while (curve > 10)
                curve = (curve / 10);
            ball_direction_x = 1;
        }

        // Touch the end line, should increment score;
        check_score();

        if (players[2].y >= CANVAS_HEIGHT - (players[2].height || 0))
            ball_direction_y = -1;
        else if (players[2].y < 0 + (players[2].height || 0))
            ball_direction_y = 1;


    }

    const renderObj = () => {

        if (!idle)
            update();

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
        requestAnimationFrame(renderObj);

    }

    const init = () => {
        ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!listKeys.includes(e.key))
                listKeys.push(e.key);
        });
        window.addEventListener('keyup', (e: KeyboardEvent) =>
        {
           listKeys.splice(listKeys.indexOf(e.key), 1);
        });
        requestAnimationFrame(renderObj);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    );
}

export default Canvas;