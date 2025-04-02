'use client';

import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'info',
		action: null,
		duration: 8000,
		vertical: 'bottom',
		horizontal: 'left',
	});

	const openSnackbar = (message, severity, action = null, duration = 8000, vertical = 'bottom', horizontal = 'left') => {
		setSnackbar({
			open: true,
			message,
			severity,
			action,
			duration,
			vertical,
			horizontal,
		});
	};

	const closeSnackbar = () => {
		if (snackbar.action) {
			snackbar.action();
		}
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	const provider = {
		snackSuccess: (message, action = null, duration = 8000, vertical = 'bottom', horizontal = 'left') =>
			openSnackbar(message, 'success', action, duration, vertical, horizontal),
		snackError: (message, action = null, duration = 8000, vertical = 'bottom', horizontal = 'left') =>
			openSnackbar(message, 'error', action, duration, vertical, horizontal),
		snackWarning: (message, action = null, duration = 8000, vertical = 'bottom', horizontal = 'left') =>
			openSnackbar(message, 'warning', action, duration, vertical, horizontal),
		snackInfo: (message, action = null, duration = 8000, vertical = 'bottom', horizontal = 'left') =>
			openSnackbar(message, 'info', action, duration, vertical, horizontal),
	};

	return (
		<SnackbarContext.Provider value={provider}>
			{children}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={snackbar.duration}
				onClose={closeSnackbar}
				anchorOrigin={{ vertical: snackbar.vertical, horizontal: snackbar.horizontal }}>
				<Alert
					onClose={closeSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};
