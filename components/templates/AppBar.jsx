"use client";

import React, { useState } from "react";

//Mui components Material
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

//Ícones
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";


const AppBarHeader = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    background: theme.navbar,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

function toggleFullScreen() {
    document.documentElement.requestFullscreen();
    if (window.innerHeight == screen.height) {
        document.exitFullscreen();
    }
}

export default function AppBar({ toggleDrawer }) {

    const [expanded, setExpanded] = useState(false);

    return (
            <AppBarHeader elevation={0}>
                <Toolbar
                    sx={{
                        pr: "24px",
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                    >
                    </IconButton>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Expandar tela"
                        sx={{
                            ml: 2,
                            ["@media (max-width:600px)"]: {
                                display: "none",
                            },
                        }}
                        onClick={() => {
                            toggleFullScreen();
                            setExpanded(!expanded);
                        }}
                    >
                        {expanded == false ? <FullscreenRoundedIcon sx={{ color: "#fff", "&:hover": { opacity: "0.3", cursor: "pointer" } }} /> : <FullscreenExitIcon sx={{ color: "#fff", "&:hover": { opacity: "0.3", cursor: "pointer" } }} />}
                    </IconButton>
                </Toolbar>

            </AppBarHeader>
    );
}