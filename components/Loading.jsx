import React from "react";
import LottieWeb from "@/shared-components/LottieWeb";
import Box from "@mui/material/Box";
import animationLottie from "@/public/lottie/searching.json";
import TypographyTitle from "@/shared-components/TypographyTitle/";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationLottie,
	height: 140,
	width: 140
};

export default function LoadAnimation() {

	return (
		<>
			<Box sx={{ width: "100%", height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
				<LottieWeb animation={defaultOptions} />
			</Box>
			<TypographyTitle text="Carregando..." sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
		</>
	);
}
