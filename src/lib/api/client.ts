import axios from "axios";
import {
	APIConfig,
	APIResponse,
	APISearchRequest,
	APISearchResponse,
} from "./types";

export const api = axios.create();

export async function fetchConfig(): Promise<APIResponse<APIConfig>> {
	try {
		const response = await api.get("/api/proxy/config");
		return response.data;
	} catch (error) {
		console.error("Error fetching config:", error);
		return {
			success: false,
			data: { srcDBs: [] },
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function searchCourses(
	semesterId: string,
	query: string
): Promise<APIResponse<APISearchResponse>> {
	try {
		const searchRequest: APISearchRequest = {
			other: {
				srcdb: semesterId,
			},
			criteria: [
				{
					field: "keyword",
					value: query,
				},
			],
		};

		const response = await api.post("/api/proxy/search", searchRequest);
		return response.data;
	} catch (error) {
		console.error("Error searching courses:", error);
		return {
			success: false,
			data: { results: [], count: 0, status: "error" },
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
