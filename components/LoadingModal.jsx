import React from 'react';
import { Modal, CircularProgress, Backdrop, Box } from '@mui/material';


const LoadingModal = ({ open }) => {
    return (
        <Modal
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                },
            }}
            disableAutoFocus
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box>
                <CircularProgress />
            </Box>
        </Modal>
    );
};

export default LoadingModal;