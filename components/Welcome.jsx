import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import LottieWeb from "@/shared-components/LottieWeb";
import ReactLottieJsonRed from "@/public/lottie/react-red.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ReactLottieJsonRed,
    height: "100%",
    width: "100%"
};

export default async function Home(props) {

    const { text } = props;

    return (
        <Box
            sx={{
                width: "100%",
                //height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                ["@media (max-width:900px)"]: {
                    flexDirection: "column",
                },
            }}
        >
            <Stack direction="column" spacing={1}>
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 900,
                        color: "#2e2e2e",
                        fontSize: {
                            lg: 28,
                            md: 18,
                            sm: 16,
                            xs: 14,
                        },
                    }}
                >
                    Olá
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 900,
                        color: "#2e2e2e",
                        fontSize: {
                            lg: 28,
                            md: 18,
                            sm: 16,
                            xs: 14,
                        },
                    }}
                >
                    Seja bem vindo(a) ao&nbsp;
                    <Typography
                        component="span"
                        sx={{
                            fontFamily: "Lato, sans-serif",
                            fontWeight: 900,
                            color: "rgb(235, 62, 15)",
                            fontSize: {
                                lg: 28,
                                md: 18,
                                sm: 16,
                                xs: 14,
                            },
                        }}
                    >
                        Gestor de tarefas
                    </Typography>
                    .
                </Typography>
            </Stack>
            <Box
                sx={{
                    ["@media (max-width:1200px)"]: {
                        width: 200,
                    },
                    ["@media (max-width:900px)"]: {
                        width: 160,
                        order: -1,
                    },
                }}
            >
                <LottieWeb animation={defaultOptions} />
            </Box>
        </Box>
    );
}