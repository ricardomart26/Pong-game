import Canvas from "../../components/Canvas";
import { Box, DialogTitle, Icon, Dialog, TextField, IconButton, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Profile from "../../components/Profile";
import { Player } from "../../interfaces/Player";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

// import playerAvatar1 from ;
// import playerAvatar2 from ; 



const testing = true;
// let testingGameScore = 0;
// let testingStartGame = false;

// if (testing) {
//     testingGameScore = 30;
//     testingStartGame = true;
// }
 


const Game = () => {

    const [open, setOpen] = useState(false); 
    
    
    // TODO: REMOVE AFTER TESTING!!!
    const [scoreToWin, setScoreToWin] = useState(30);
    const [startGame, setStartGame] = useState(true); 


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

    const handleScoreToWinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScoreToWin(+e.target.value);
    }


    let colorTransparencyStyle = "0.2";

    const changeKeysBackgound = (activate: boolean) => {
        colorTransparencyStyle = activate ? "0.5" : "0.2";
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (
        <Box>
            <Box mt="-30px" mb="10px">
                <Typography fontFamily="Courier New" variant="h4">Pong game</Typography>

            </Box>
            <Dialog open={open} sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "500px",  // Set your width here
                    },
                },
            }}
            onClose={handleClose}
            >
                <DialogTitle>
                    How many points to win?
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <TextField fullWidth required autoFocus onChange={handleScoreToWinInput} margin="dense" label="Points to win" type="text" variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setStartGame(true); handleClose()}}>Play</Button>
                </DialogActions>
            </Dialog>
            <Box display="flex" justifyContent="center" alignItems="baseline">
                <Box m="50px">
                    <Profile player={player1}/>
                </Box>
                {startGame && <Canvas changeKeys={changeKeysBackgound} scoreToWin={scoreToWin}/>}
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
            {!startGame && <Button sx={{paddingY: -10}}onClick={(e: React.MouseEvent) => setOpen(true)} variant="outlined" draggable> Play a game</Button>}
        </Box>
    );
}

export default Game;