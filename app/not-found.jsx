"use server";

import { Box, Typography, Button } from '@mui/material';
import PageContainer from "@/components/PageContainer";

export default async function NotFound() {

    return (
        <PageContainer title="Ooops. Página não encontrada!">
            <Box sx={{ width: "100%", height: "400px" }}>
                <Typography variant="h1" color="error" sx={{ fontSize: '5rem' }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    Página Não Encontrada
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 4 }}>
                    Desculpe, mas a página que você procurou não existe.
                </Typography>
            </Box>
        </PageContainer>   
    );
}
