import { Semester } from "@/types/semester";

interface SemesterSelectorProps {
	semesters: Semester[];
	selectedSemesterId: string;
	onSemesterChange: (semesterId: string) => void;
}

export function SemesterSelector({
	semesters,
	selectedSemesterId,
	onSemesterChange,
}: SemesterSelectorProps) {
	return (
		<div className="flex items-center gap-2">
			<label
				htmlFor="semester"
				className="text-sm font-medium text-gray-700"
			>
				Semester:
			</label>
			<select
				id="semester"
				value={selectedSemesterId}
				onChange={(e) => onSemesterChange(e.target.value)}
				className="px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
			>
				{semesters.map((semester) => (
					<option key={semester.id} value={semester.id}>
						{semester.name}
					</option>
				))}
			</select>
		</div>
	);
}
