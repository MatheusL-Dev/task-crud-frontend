"use server";

import { responseError, responseHandler } from "@/helpers/server-actions";
import { revalidateTag } from "next/cache";

export async function updateTask({ id, formData }) {

	try {
		const endpoint = `${process.env.NEXT_INTEGRACAO_URL}/task/${id}/`;
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			next: { revalidate: 0 },
            body: JSON.stringify(formData)
		});

		const result = await responseHandler(response);
		revalidateTag("tasks")
		return result;
	} catch (error) {
		console.error(`Exception: ${error}`);
		return { ...responseError, error: error };
	}
}