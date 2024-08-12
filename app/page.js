'use client'

import Login from "./components/Login";
import { Box } from "@mui/material";

function Home() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            style={{
                background: 'linear-gradient(135deg, #131414 25%, #1DB254 100%)',
            }}
        >
            <Login />
        </Box>
    );
}

export default Home;

