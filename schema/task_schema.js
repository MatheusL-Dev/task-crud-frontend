import * as yup from "yup";

export const taskSchema = yup.object().shape({
	nome: yup.string().required("O nome é obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres"),
	descricao: yup.string().required("A descrição é obrigatória"),
	status: yup.string().oneOf(["pendente", "em_andamento", "concluida", "cancelada"], "Status inválido").required("O status é obrigatório")
});