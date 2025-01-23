import { fetchConfig } from "@/lib/api/client";
import { APISourceDB } from "@/lib/api/types";
import { Semester } from "@/types/semester";
import { useQuery } from "@tanstack/react-query";

function mapAPISourceDBToSemester(sourceDB: APISourceDB): Semester {
	return {
		id: sourceDB.code,
		name: sourceDB.name,
	};
}

export function useSemesters() {
	return useQuery({
		queryKey: ["semesters"],
		queryFn: async () => {
			const response = await fetchConfig();
			if (!response.success) {
				throw new Error(response.error || "Failed to fetch semesters");
			}
			return response.data.srcDBs.map(mapAPISourceDBToSemester);
		},
	});
}
