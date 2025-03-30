import { Schema } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="body1" fontSize={20}>
        Page Not Found
      </Typography>
      <Link to={"/"}>
        <Typography>Go To Home</Typography>
      </Link>
    </Stack>
  );
};

export default NotFound;
