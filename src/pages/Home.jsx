import { Stack, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        maxHeight: "100%",
        width: "100%",
        overflowY: "auto",
      }}
      flexGrow={1}
    >
      <Typography variant="body1" fontSize={40}>
        Frontendkit
      </Typography>
    </Stack>
  );
};

export default Home;
