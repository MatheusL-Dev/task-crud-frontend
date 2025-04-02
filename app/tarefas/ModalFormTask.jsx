"use client";

import PrimaryButton from "@/components/PrimaryButton";
import { MODAL_ACTIONS } from "@/helpers/utils";
import { taskSchema } from "@/schema/task_schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SnackbarContext } from "../SnackbarProvider";
import { createTask } from "./actions/createTask";
import { updateTask } from "./actions/updateTask";

export default function ModalFormTask({ action, open, onClose, task }) {

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(taskSchema),
	});
	
	const snackProvider = useContext(SnackbarContext);

	const actionHandlers = {
		[MODAL_ACTIONS.CREATE]: async (formData) => {
			const { status } = await createTask({ formData });
			status === 201 ? snackProvider.snackSuccess("Sucesso em criar a task") : snackProvider.snackError("Erro em criar a task");
		},
		[MODAL_ACTIONS.EDIT]: async (formData) => {
			const { status } = await updateTask({ id: task.id, formData });
			status === 200 ? snackProvider.snackSuccess("Atualização realizada com sucesso") : snackProvider.snackError("Erro em atualizar a task");
		},
	};

	const handleFormSubmit = async (formData) => {
		await actionHandlers[action](formData);
		onClose();
	};

	useEffect(() => {
		reset({});
	}, [open]);

	useEffect(() => {
		if (action === "CREATE") return;
		reset({
			nome: task.nome,
			descricao: task.descricao,
			status: task.status
		  });
	}, [action,task])

	return (
		<Dialog maxWidth={'lg'}  component={"form"} onSubmit={handleSubmit(handleFormSubmit)} open={open} onClose={onClose}>
			<DialogTitle>{action === "EDIT" ? "Editar tarefa" : "Criar nova tarefa"}</DialogTitle>
			<Divider sx={{ marginInline: 3 }} />
				<Grid sx={{p: 3, width: '800px'}} container spacing={1}>
					<Grid item xs={12} md={4}>
						<Controller
							name="nome"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Nome"
									variant="outlined"
									rows={2}
									error={!!errors.name}
									helperText={errors.name?.message}
									fullWidth
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} md={5}>
						<Controller
							name="descricao"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Descrição"
									variant="outlined"
									rows={2}
									error={!!errors.description}
									helperText={errors.description?.message}
									fullWidth
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<FormControl sx={{ width: "100%" }} fullWidth error={!!errors.status}>
									<InputLabel>Status</InputLabel>
									<Select {...field} label="Status">
										<MenuItem value="pendente">Pendente</MenuItem>
										<MenuItem value="em_andamento">Em andamento</MenuItem>
										<MenuItem value="concluida">Concluída</MenuItem>
										<MenuItem value="cancelada">Cancelada</MenuItem>
									</Select>
									<FormHelperText>{errors.status?.message}</FormHelperText>
								</FormControl>
							)}
						/>
					</Grid>
				</Grid>
			<DialogActions>
				<PrimaryButton onClick={onClose} color={"error"}>
					Cancelar
				</PrimaryButton>
				<PrimaryButton type={"submit"}>Criar</PrimaryButton>
			</DialogActions>
		</Dialog>
	);
}

ModalFormTask.propTypes = {
	action: PropTypes.oneOf(["EDIT", "CREATE"]).isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	task: PropTypes.object,
};

ModalFormTask.defaultProps = {
	task: {},
}