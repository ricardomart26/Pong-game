
// // import Canvas from '../../components/Canvas';
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const GameMenu = () => {

    const navigate = useNavigate();

    const options = [
        {
            opt: "1 vs 1",
            action: () => {navigate('/game/1vs1')},
            backgroundColor: "blue",
        }, 
        {
            opt: "1 vs 1 (Offline)",
            action: () => {navigate('/game/1vs1off')},
            backgroundColor: "yellow",
        },
        {
            opt :"1 vs pc",
            action: () => {navigate('/game/1vspc')},
            backgroundColor: "green",
        }, 
        {
            opt: "training",
            action: () => {navigate('/game/training')},
            backgroundColor: "grey",
        },
    ];

    const render_options = () => {
        return options.map((option, key) => {
            return (
                <Button 
                variant="outlined" 
                sx={{
                    margin: "10px",
                    fontFamily: "Courier New",
                    backgroundColor: option.backgroundColor
                }} 
                color='error' 
                onClick={option.action}
                fullWidth
                key={key}
            >
                {option.opt}
                </Button>
            )
        });
    }    

    return (
        <div>
            <h1>Pong game</h1>
            <Box mt="10px">
                <Box display="flex" flexDirection="column">
                    <Typography m={10} variant="h3" fontFamily="Courier New">
                        CHOOSE A OPTION
                    </Typography>
                    {render_options()}
                </Box>
            </Box>
        </div>
    );

}


export default GameMenu;