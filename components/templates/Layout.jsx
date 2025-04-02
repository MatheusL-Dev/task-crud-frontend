"use client";

import React from "react";

//Material
import Box from "@mui/material/Box";

//Ícones
import BotaoScrollTop from "@/components/templates/BotaoScrollTop";

import AppBar from "@/components/templates/AppBar";


export default function TemplateLayout({ children }) {

    return (
        <Box sx={{ width: "100%", height: "100%", minWidth: "100%", minHight: "100%" }}>
            <AppBar />
            <Box
                sx={{
                    marginTop: "80px",
                    marginLeft: "25px",
                    marginRight: "25px",
                    marginRight: "1%",
                    transition: "margin-left 0.3s ease",
                    ["@media (max-width:880px)"]: {
                        marginTop: "70px",
                        marginLeft: { xs: 1, sm: 2 },
                        marginRight: { xs: 1, sm: 2 },
                    },
                }}
            >
                <BotaoScrollTop />
                {children}
            </Box>
        </Box>
    );
}