import React, { useContext, useEffect, useState } from "react";

import CardCharts from "@/components/CardCharts";
import PieChartMes from "@/components/dash/PieChartMes";
import PieChartStatus from "@/components/dash/PieChartStatus";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Dialog, Grid, IconButton, Slide, Toolbar, Typography, useTheme } from "@mui/material";

// Actions
import { getPieChartStatus } from "@/components/dash/actions/getEtl";

// Custom Components
import { SnackbarContext } from "@/app/SnackbarProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalEtl({ open, title, handleClose }) {

	const [data, setData] = useState({});
	const theme = useTheme();
	const snackProvider = useContext(SnackbarContext);
	
	useEffect(() => {handleGetPieChartStatus()}, []);
	
	const handleGetPieChartStatus = async () => {
		
		const { status, data } = await getPieChartStatus();
		
		if (!status) {
			snackProvider.snackError(`Ocorreu um erro ao carregar os dados do ETL`);
		}
		setData(data)
	};

	return (
		<Dialog fullWidth  open={open} maxWidth={"lg"} onClose={handleClose} TransitionComponent={Transition}>
			<AppBar
				position="sticky"
				sx={{
					backgroundColor: theme.navbar,
				}}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			
				<Grid p={3} width={'100%'} container spacing={2}>
					<Grid item xs={12} sm={12} md={6} >
						<CardCharts title={"Gráfico por Status"}>
							<PieChartStatus data={data} />
						</CardCharts>
					</Grid>
					
					<Grid item xs={12}  sm={12} md={6}  >
						<CardCharts title={"Gráfico por Mês"}>
							<PieChartMes data={data} />
						</CardCharts>
					</Grid>
				</Grid>
		</Dialog>
	);
}