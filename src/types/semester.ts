export interface Semester {
	id: string; // e.g., "2025-su", "2025-fa"
	name: string; // e.g., "Summer 2025", "Fall 2025"
}

export const SEMESTERS: Semester[] = [
	{ id: "2024-su", name: "Summer 2024" },
	{ id: "2024-fa", name: "Fall 2024" },
	{ id: "2025-sp", name: "Spring 2025" },
	{ id: "2025-su", name: "Summer 2025" },
	{ id: "2025-fa", name: "Fall 2025" },
];
