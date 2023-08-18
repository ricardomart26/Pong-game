
import { Player } from "../interfaces/Player"
import { Box, Typography, Avatar } from "@mui/material"


const Profile = ({player}: {player: Player}) => {

    return (
        <Box display="flex" justifyContent="center" flexDirection="column">
            <Box borderRadius="50%" border="3px solid black">
                <Avatar sx={{ width: 100, height: 100 }}  src={player.avatarUrl}/>
            </Box>
            <Typography variant="h5" fontFamily="Courier New">{player.name}</Typography>
        </Box>
    );
}

export default Profile;