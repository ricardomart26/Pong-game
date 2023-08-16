import Canvas from "../../components/Canvas";
import { Box, Icon } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const Game = () => {

    let colorTransparencyStyle = "0.2";


    const changeKeysBackgound = (activate: boolean) => {
        
        colorTransparencyStyle = activate ? "0.5" : "0.2";
    }

    return (
        <div>
            <h1>Pong game</h1>
            <Box display="flex" justifyContent="center">
                <Canvas changeKeys={changeKeysBackgound}/>
                <Box display="flex" justifyContent="center" flexDirection="column">
                    <Box>
                        <KeyboardArrowUp/>
                    </Box>
                    <Box sx={{backgroundColor: `rgba(0, 0, 0, ${colorTransparencyStyle}))`}}>
                        <KeyboardArrowDown/>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Game;