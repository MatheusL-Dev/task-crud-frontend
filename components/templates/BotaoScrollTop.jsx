"use client";

import { useState, useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { styled } from "@mui/material/styles";


const ButtonScrollUp = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    position: "fixed",
    zIndex: 20,
    bottom: 20,
    right: 20,
    width: "45px",
    height: "45px",
    border: `1px solid ${theme.contrastText}`,
    background: theme.navbar,

    "&:hover": {
        cursor: "pointer",
    },

    ["@media (max-width:980px)"]: {
        right: 10,
        bottom: 5,
    },
}));

export default function BotaoScrollTop() {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setFadeIn(true);
            } else {
                setFadeIn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {fadeIn && (
                <Tooltip title="Voltar para o topo" placement="top">
                    <Grow in={fadeIn}>
                        <ButtonScrollUp onClick={goToTop}>
                            <KeyboardArrowUpRoundedIcon
                                sx={{
                                    color: "#fff",
                                    fontSize: 35,
                                }}
                            />
                        </ButtonScrollUp>
                    </Grow>
                </Tooltip>
            )}
        </>
    );
}