"use client";

import { useContext, useEffect, useState } from "react";

//Mui components
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

//Ícones
import EditIcon from "@mui/icons-material/Edit";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// Utils
import { MODAL_ACTIONS, parseDataFromPtBr, taskStatus } from "@/helpers/utils";

// Custom Components
import { SnackbarContext } from "@/app/SnackbarProvider";
import ColumnActionButton from "@/components/ColumnActionButton";
import PrimaryButton from "@/components/PrimaryButton";
import TypographTitle from "@/components/typograph/title";

import { deleteTask } from "./actions/deleteTask";
import ModalEtl from "./ModalEtl";
import ModalFormTask from "./ModalFormTask";

export default function Tarefas({preLoad}) {
	const [tasks, setTasks] = useState(preLoad);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingItem, setIsLoadingItem] = useState({});
	const [currentTask, setCurrentTask] = useState({});
	const [openModalForm, setOpenModalForm] = useState(false);
	const [openModalEtl, setOpenModalEtl] = useState(false)
	const [actionModalForm, setActionModalForm] = useState(MODAL_ACTIONS.CREATE);
	
	useEffect(() => {
        setTasks(preLoad);
    }, [preLoad]);
	
	const handleOpenCloseModalEtl = () => {
		setOpenModalEtl((prev) => !prev)
	}

	const snackProvider = useContext(SnackbarContext);

	const handleLoadingItemDataGrid = (id) => {
		setIsLoadingItem((prev = {}) => ({
			...prev,
			[String(id)]: !prev?.[String(id)] ?? true,
		}));
	};

	const handleDeleteTask = async (id) => {
		handleLoadingItemDataGrid(id);
		const { status } = await deleteTask({ id });
		handleLoadingItemDataGrid(id);

		if (!status) {
			snackProvider.snackError(`Erro em deletar tarefa de id ${id}`);
		}
		snackProvider.snackSuccess(`Tarefa de id: ${id} deletada com sucesso`);
	};

	const handleCloseModalAction = () => {
		setOpenModalForm(false);
	};

	const handleModalEditAction = (task) => {
		handleOpenModalAction(MODAL_ACTIONS.EDIT)
		setCurrentTask(task)
	};
	
	const handleOpenModalAction = (action) => {
		switch (action) {
			case MODAL_ACTIONS.CREATE:
				setActionModalForm(action);
				setCurrentTask({});
				break;
			case MODAL_ACTIONS.EDIT:
				setActionModalForm(action);
				break;
			default:
				break;
		}
		setOpenModalForm(true);
	};
	
	var rows = generateRows(tasks);
	var columns = generateColumns(isLoadingItem, handleModalEditAction, handleDeleteTask);

	return (
		<Stack paddingInline={2} spacing={2} mt={3}>
			<Stack alignItems={"center"} flexDirection={"row"} justifyContent={"space-between"}>
				<TypographTitle>Tarefas</TypographTitle>
				<Stack flexDirection={'row'} gap={1}>
				<PrimaryButton onClick={() => handleOpenModalAction(MODAL_ACTIONS.CREATE)} >Adicionar tarefa</PrimaryButton>
				<PrimaryButton color={"secondary"} onClick={handleOpenCloseModalEtl} >
					Ver Etl
					<LeaderboardIcon sx={{ml: 1}} />
					</PrimaryButton>
					
				</Stack>
			</Stack>

			<Stack>
				<DataGrid autoHeight rows={rows} columns={columns} paginationMode="client" loading={isLoading} />
			</Stack>

			<ModalFormTask task={currentTask} open={openModalForm} action={actionModalForm} onClose={handleCloseModalAction}  />
			<ModalEtl open={openModalEtl} title={"ETL tarefas"}  handleClose={handleOpenCloseModalEtl}  />
		</Stack>
	);
}

function generateRows(tasks) {
	return tasks?.map((task, index) => {
		return {
			id: task.id,
			nome: task.nome,
			descricao: task.descricao,
			data_criacao: task.data_criacao,
			data_atualizacao: task.data_atualizacao,
			status: task.status,
		};
	});
}

const generateColumns = (isLoadingItem, handleEditTask, handleDeleteTask) => [

	{
		field: "actions",
		headerName: "actions",
		renderHeader: (params) => <strong>Ações</strong>,
		width: 200,
		align: "center",
		headerAlign: "center",
		renderCell: (params) => {
			return (
				<Stack gap={0.5} flexDirection={"row"}>
					<ColumnActionButton floatingLabel={"Editar"} icon={<EditIcon />} onClick={() => handleEditTask(params.row)} />
					<ColumnActionButton
						isLoading={isLoadingItem[params.row.id]}
						floatingLabel={"Remover"}
						icon={<RemoveCircleOutlineIcon />}
						onClick={() => handleDeleteTask(params.row.id)}
						sx={{ color: "error" }}
					/>
				</Stack>
			);
		},
	},

	{
		field: "id",
		headerName: "ID",
		renderHeader: (params) => <strong>ID</strong>,
		width: 150,
		align: "center",
		headerAlign: "center",
	},

	{
		field: "nome",
		headerName: "NOME",
		renderHeader: (params) => <strong>NOME</strong>,
		width: 250,
		align: "center",
		headerAlign: "center",
	},

	{
		field: "descricao",
		headerName: "DESCRICAO",
		renderHeader: (params) => <strong>DESCRICAO</strong>,
		width: 350,
		align: "center",
		headerAlign: "center",
	},

	{
		field: "data_criacao",
		headerName: "DATA CRIACAO",
		renderHeader: (params) => <strong>DATA CRIACAO</strong>,
		width: 250,
		align: "center",
		headerAlign: "center",
		renderCell: (params) => parseDataFromPtBr(params.value),
	},

	{
		field: "data_atualizacao",
		headerName: "DATA ATUALIZACAO",
		renderHeader: (params) => <strong>DATA ATUALIZACAO</strong>,
		width: 250,
		align: "center",
		headerAlign: "center",
		renderCell: (params) => parseDataFromPtBr(params.value),
	},

	{
		field: "status",
		headerName: "STATUS",
		renderHeader: (params) => <strong>STATUS</strong>,
		width: 300,
		align: "center",
		headerAlign: "center",
		renderCell: (params) => taskStatus(params.value),
	}
];