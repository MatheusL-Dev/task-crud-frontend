"use client";

import Link from "next/link";

// Mui components
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";

//Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    return {
        height: theme.spacing(3),
        fontFamily: "Lato, sans-serif",
        fontWeight: 400,
    };
});

const PageContainerNav = () => {
    const router = useRouter();
    const pathname = usePathname();

    var rota = pathname.split("/");
    var rota_page = "/";
    let pages = rota.length;
    let row = 1;

    const handleRota = (path) => {
        row += 1;
        row == pages ? (rota_page = "#") : (rota_page += `${path}/`);
    };

    return (
        <Grid
            sx={{
                mt: 1,
                mb: 1,
                ["@media (max-width:880px)"]: {
                    display: "none",
                },
            }}
        >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ width: "100%" }}>
                <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <Link href="#" passHref>
                        <Typography variant="h5" fontFamily="Lato, sans-serif" fontWeight="900">{`${rota[1]} |`}</Typography>
                    </Link>

                    {rota.map((item, index) =>
                        item != rota[1] ? (
                            item == "" ? (
                                <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Link href="/tarefas" passHref>
                                        <HomeIcon sx={{ fontSize: 26, cursor: "pointer" }} />
                                    </Link>

                                    <Typography>{handleRota(rota[1])}</Typography>
                                </div>
                            ) : (
                                <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    {handleRota(item)}

                                    <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />

                                    {row == pages - 1 ? (
                                        <StyledBreadcrumb component="a" href="#" onClick={() => router.back()} label={item}></StyledBreadcrumb>
                                    ) : (
                                        <Link href={rota_page} passHref>
                                            <StyledBreadcrumb fontSize="14" label={item}></StyledBreadcrumb>
                                        </Link>
                                    )}
                                </div>
                            )
                        ) : null
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default function PageContainer({ children, title }) {

    return (
        <>
            <PageContainerNav />
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    flexGrow: 1,
                }}
                elevation={0}
                variant="outlined"
            >
                <Grid container sx={{ padding: "0 0 30px 0" }}>
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                        <Typography text={title} />

                    </Grid>

                    <Grid item xs={12}>
                        <Divider orientation="horizontal" />
                    </Grid>

                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}