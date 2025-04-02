import "@/styles/global.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "@/app/SnackbarProvider";

import { darkTheme, redTheme, blueTheme, greenTheme } from "@/styles/Themes";

export const metadata = {
    title: "Tarefas",
    generator: "Tarefas",
    applicationName: "task",
    referrer: "origin-when-cross-origin",
    keywords: [],
    authors: [],
    creator: "@matheusL",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "black",
};

const listaTemas = {
    'dark': darkTheme,
    'red': redTheme,
    'blue': blueTheme,
    'green': greenTheme
};

export default async function RootLayout({ children }) {

    const RootTemplate = children
    const theme = listaTemas['red']

    return (
        <html lang="pt-BR">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider>
                            {RootTemplate}
                        </SnackbarProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}