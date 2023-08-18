import Canvas from "../../components/Canvas";
import { Box, Icon } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Profile from "../../components/Profile";
import { Player } from "../../interfaces/Player";
// import playerAvatar1 from ;
// import playerAvatar2 from ; 


const Game = () => {

    const player1: Player = {
        name: "Player1",
        email: "Player1@gmail.com",
        avatarUrl: process.env.PUBLIC_URL + '/Player1.png',
    }

    const player2: Player = {
        name: "Player2",
        email: "Player2@gmail.com",
        avatarUrl: process.env.PUBLIC_URL + '/Player2.png',
    }


    let colorTransparencyStyle = "0.2";

    const changeKeysBackgound = (activate: boolean) => {
        colorTransparencyStyle = activate ? "0.5" : "0.2";
    }

    return (
        <div>
            <h1>Pong game</h1>
            <Box display="flex" justifyContent="center">
                <Box m="50px">
                    <Profile player={player1}/>
                </Box>
                <Canvas changeKeys={changeKeysBackgound}/>
                {/* <Box display="flex" justifyContent="center" flexDirection="column">
                    <Box>
                        <KeyboardArrowUp/>
                    </Box>
                    <Box sx={{backgroundColor: `rgba(0, 0, 0, ${colorTransparencyStyle}))`}}>
                        <KeyboardArrowDown/>
                    </Box>
                </Box> */}
                <Box m="50px">
                    <Profile player={player2}/>
                </Box>
            </Box>
        </div>
    );
}

export default Game;