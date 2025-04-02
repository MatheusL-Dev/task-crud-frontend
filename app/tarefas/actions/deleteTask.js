"use server";

import { responseError, responseHandler } from "@/helpers/server-actions";
import { revalidateTag } from "next/cache";

export async function deleteTask({id}) {


	try {
		const endpoint = `${process.env.NEXT_INTEGRACAO_URL}/task/${id}/`;
		const response = await fetch(endpoint, {
			method: "DELETE",
			next: { revalidate: 0 },
		});

		const result = await responseHandler(response);
		revalidateTag('tasks')
		return result;
	} catch (error) {
		console.error(`Exception: ${error}`);
		return { ...responseError, error: error };
	}
}
