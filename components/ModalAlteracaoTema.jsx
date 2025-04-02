import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

//Context
import { updateUserTheme } from "@/app/configuracoes/usuario/actions/updateUserTheme";

import { useSession } from "next-auth/react";

const CustomBox = styled(Box)((props) => ({
    widht: "100%",
    height: "100%",
    backgroundColor: props.color,
    cursor: "pointer",
    borderRadius: "0px",
    transition: "all 0.2s ease",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,

    "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
    },
}));

export default function ConfiguracoesDeInterface() {

    const { status, data: session, update: updateSession } = useSession();

    async function changeColor(e) {
        await updateSession({ ...session.user, theme: e.target.id })
        const { success } = await updateUserTheme({ username: session.user.username, theme: e.target.id })
        // TODO: Show an error message in case of errors

    }

    return (
        <Grid container spacing={1} sx={{ padding: 1 }}>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#000"} id="dark" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#eb3d35"} id="red" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#1862d9"} id="blue" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#1C8A7F"} id="green" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#ffab00"} id="yellow" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#4a148c"} id="purple" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#ff1ca0"} id="pink" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#162447"} id="dark_Blue" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#004d40"} id="dark_Green" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#01cc88"} id="greenLight" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#242424"} id="darkGrayTheme" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#006064"} id="sea_Blue" onClick={changeColor} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ height: "100px" }}>
                <CustomBox color={"#000000"} id="realDarkTheme" onClick={changeColor} />
            </Grid>
        </Grid>
    );
}
