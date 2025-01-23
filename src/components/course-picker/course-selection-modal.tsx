import { Course, Lab, Recitation, Section } from "@/types/course";
import { useState } from "react";

interface CourseSelectionModalProps {
	course: Course;
	onConfirm: (
		courseId: string,
		sectionId: string,
		recitationId?: string,
		labId?: string
	) => void;
	onCancel: () => void;
	initialSection?: Section;
	initialRecitation?: Recitation;
	initialLab?: Lab;
}

export function CourseSelectionModal({
	course,
	onConfirm,
	onCancel,
	initialSection,
	initialRecitation,
	initialLab,
}: CourseSelectionModalProps) {
	const [selectedSectionId, setSelectedSectionId] = useState<string>(
		initialSection?.id || ""
	);
	const [selectedRecitationId, setSelectedRecitationId] = useState<string>(
		initialRecitation?.id || ""
	);
	const [selectedLabId, setSelectedLabId] = useState<string>(
		initialLab?.id || ""
	);

	const handleConfirm = () => {
		if (!selectedSectionId) return;
		onConfirm(
			course.id,
			selectedSectionId,
			selectedRecitationId || undefined,
			selectedLabId || undefined
		);
	};

	const isValid =
		selectedSectionId &&
		(!course.recitations.length || selectedRecitationId) &&
		(!course.labs.length || selectedLabId);

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
				<h2 className="text-lg font-medium mb-4">
					{initialSection ? "Edit" : "Select"} Course Schedule
				</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Section
						</label>
						<select
							value={selectedSectionId}
							onChange={(e) =>
								setSelectedSectionId(e.target.value)
							}
							className="w-full p-2 border rounded"
						>
							<option value="">Select Section</option>
							{course.sections.map((section) => (
								<option key={section.id} value={section.id}>
									{section.professor} -{" "}
									{section.schedule.days.join(", ")}{" "}
									{section.schedule.startTime}-
									{section.schedule.endTime}
								</option>
							))}
						</select>
					</div>

					{course.recitations.length > 0 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Recitation
							</label>
							<select
								value={selectedRecitationId}
								onChange={(e) =>
									setSelectedRecitationId(e.target.value)
								}
								className="w-full p-2 border rounded"
							>
								<option value="">Select Recitation</option>
								{course.recitations.map((recitation) => (
									<option
										key={recitation.id}
										value={recitation.id}
									>
										{recitation.instructor} -{" "}
										{recitation.schedule.days.join(", ")}{" "}
										{recitation.schedule.startTime}-
										{recitation.schedule.endTime}
									</option>
								))}
							</select>
						</div>
					)}

					{course.labs.length > 0 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Lab
							</label>
							<select
								value={selectedLabId}
								onChange={(e) =>
									setSelectedLabId(e.target.value)
								}
								className="w-full p-2 border rounded"
							>
								<option value="">Select Lab</option>
								{course.labs.map((lab) => (
									<option key={lab.id} value={lab.id}>
										{lab.instructor} -{" "}
										{lab.schedule.days.join(", ")}{" "}
										{lab.schedule.startTime}-
										{lab.schedule.endTime}
									</option>
								))}
							</select>
						</div>
					)}

					<div className="flex justify-end gap-2 mt-6">
						<button
							onClick={onCancel}
							className="px-4 py-2 text-gray-600 hover:text-gray-800"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirm}
							disabled={!isValid}
							className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{initialSection ? "Save Changes" : "Add Course"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
