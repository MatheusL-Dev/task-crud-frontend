import * as React from "react";

// Material
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import TitleTypograph from "@/components/shared-components/ui/TitleTypograph";

export default function BasicModal(props) {
	const { width } = props;

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: width ?? 650,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 3,
		//overflowY: "scroll",
		["@media (max-width:700px)"]: {
			width: "95%",
		},
		["@media (max-height:900px)"]: {
			height: props.heightMax900px, //Mandar via props o valor de altura do modal para não conter inconsistências em diferentes páginas que utilizam esse componente de modal.
		},
	};

	return (
		<Modal open={props.open} onClose={props.onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Box sx={style}>
				<TitleTypograph text={props.title} />
				<Divider orientation="horizontal" />
				<Box id="modal-modal-description" sx={{ mt: 2 }}>
					{props.children}
				</Box>
			</Box>
		</Modal>
	);
}
