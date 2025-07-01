import { Box, CircularProgress } from "@mui/material";

const Loading = () =>{
    return (
      <Box alignContent={'center'} justifyContent={'center'}>
        <CircularProgress />
      </Box>
    );
}

export default Loading;
