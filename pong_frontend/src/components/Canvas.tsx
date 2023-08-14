import { exit } from "process";
import { useEffect, useRef } from "react";


interface Object {
    x: number;
    y: number;
    color: string;
    height?: number;
};


const SPEED = 1.5;

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let ctx: CanvasRenderingContext2D;
    const listKeys: string[] = [];
    let direction: number = 1;
    const width = 500;
    const height = 500;
    const players: Object[] = [{x: 30, y: 250, color: 'yellow'}, {x: 450, y: 250, color: 'blue'}, {x: width / 2, y: height / 2, color: 'black', height: 10}]

    const move = (move: number, player: number) => {
        players[player].y += move * SPEED;
    }

    const colision = (player: number): boolean => {
        return ((players[2].x >= players[player].x - 7 && players[2].x <= players[player].x + 7)
            && (players[2].y >= players[player].y - 35 && players[2].y <= players[player].y + 35))
    }

    const update = () => {
        if (listKeys.includes('w'))
            move(-1, 0);
        else if (listKeys.includes('s'))
            move(1, 0);
        if (listKeys.includes('ArrowUp'))
            move(-1, 1);
        else if (listKeys.includes('ArrowDown'))
            move(1, 1);
        
        players[2].x += SPEED * direction;
        
        if (direction == 1 && colision(1))
            direction = -1;
        else if (direction == -1 && colision(0))
            direction = 1;

        if (players[2].x > width || players[2].x < 0)
        {
            players[2].x = width / 2;
            players[2].y = height / 2
        }

    }

    const renderObj = () => {

        update();

        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        players.forEach(player => { 
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y - (player.height || 70) / 2, 10, player.height || 70);
        });
        requestAnimationFrame(renderObj);

    }
    
    const init = () => {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!listKeys.includes(e.key))
                listKeys.push(e.key);
        });
        window.addEventListener('keyup', (e: KeyboardEvent) =>
        {
           listKeys.splice(listKeys.indexOf(e.key), 1);
        });
        ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
        requestAnimationFrame(renderObj);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <canvas ref={canvasRef} width={width} height={height}></canvas>
    );
}

export default Canvas;