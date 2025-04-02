import Chip from "@mui/material/Chip";

export function taskStatus (status) {
    switch(status.toLowerCase()) {
        case "concluida":
            return (<Chip color="success" variant="filled"  label={"Concluída"}  />)
        case "em_andamento":
            return (<Chip sx={{ backgroundColor: '#FFA500', color: 'white' }}  variant="filled"  label={"Em andamento"}  /> )
        case "pendente":
            return (<Chip color="default" variant="filled"  label={"Pendente"}  />)
        case "cancelada":
            return (<Chip color="error" variant="filled"  label={"Cancelada"}  />)
        default:
            return (<Chip label={status} variant="filled" />);
    }
}

export function parseDataFromPtBr(date) {
    const data = new Date(date);
    return data.toLocaleDateString('pt-BR');
}

export const MODAL_ACTIONS = Object.freeze({
	EDIT: "EDIT",
	CREATE: "CREATE",
});

export const COLORS = [
    "#8884d8",  // Roxo claro
    "#82ca9d",  // Verde claro
    "#ff8c00",  // Laranja vibrante
    "#ff4d4d",  // Vermelho claro
    "#4caf50",  // Verde forte
    "#0097a7",  // Azul escuro
    "#f44336",  // Vermelho
    "#673ab7",  // Roxo
    "#03a9f4",  // Azul claro
    "#e91e63",  // Rosa
    "#9c27b0",  // Roxo escuro
    "#00bcd4",  // Ciano
]; 

export const meses = {
    1: "Jan",
    2: "Fev",
    3: "Mar",
    4: "Abr",
    5: "Mai",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Set",
    10: "Out",
    11: "Nov",
    12: "Dez"
}