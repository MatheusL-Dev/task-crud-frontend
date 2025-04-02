"use server";

import { responseError, responseHandler } from "@/helpers/server-actions";

export async function getTasks() {

	try {
		const endpoint = `${process.env.NEXT_INTEGRACAO_URL}/task`;
		const response = await fetch(endpoint, {
			method: "GET",
			cache: "no-store",
			next: { tags: ["tasks"] },
		});

		const result = await responseHandler(response);
		return result;
		
	} catch (error) {
		console.error(`Exception: ${error}`);
		return { ...responseError, error: error };
	}
}
