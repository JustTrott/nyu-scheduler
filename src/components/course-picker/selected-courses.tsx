import { SelectedCourse } from "@/types/course";

interface SelectedCoursesProps {
	selectedCourses: SelectedCourse[];
	onRemoveCourse: (courseId: string) => void;
	onEditCourse: (course: SelectedCourse) => void;
}

export function SelectedCourses({
	selectedCourses,
	onRemoveCourse,
	onEditCourse,
}: SelectedCoursesProps) {
	return (
		<div className="flex flex-col h-full">
			<h2 className="font-medium text-lg mb-4">Selected Courses</h2>
			<div className="overflow-y-auto flex-1 pr-2">
				<div className="flex flex-col gap-4">
					{selectedCourses.map((selectedCourse) => (
						<div
							key={selectedCourse.course.id}
							className="p-4 bg-white rounded-lg shadow-sm space-y-2"
						>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-medium">
										{selectedCourse.course.code}
									</h3>
									<p className="text-sm text-gray-600">
										{selectedCourse.course.name}
									</p>
								</div>
								<div className="flex gap-2">
									<button
										onClick={() =>
											onEditCourse(selectedCourse)
										}
										className="text-purple-500 hover:text-purple-700"
									>
										Edit
									</button>
									<button
										onClick={() =>
											onRemoveCourse(
												selectedCourse.course.id
											)
										}
										className="text-red-500 hover:text-red-700"
									>
										Remove
									</button>
								</div>
							</div>

							<div className="text-sm text-gray-600 space-y-1">
								<p>
									<span className="font-medium">
										Section:
									</span>{" "}
									{selectedCourse.selectedSection?.professor}{" "}
									-{" "}
									{selectedCourse.selectedSection?.schedule.days.join(
										", "
									)}{" "}
									{
										selectedCourse.selectedSection?.schedule
											.startTime
									}
									-
									{
										selectedCourse.selectedSection?.schedule
											.endTime
									}
								</p>
								{selectedCourse.selectedRecitation && (
									<p>
										<span className="font-medium">
											Recitation:
										</span>{" "}
										{
											selectedCourse.selectedRecitation
												.instructor
										}{" "}
										-{" "}
										{selectedCourse.selectedRecitation.schedule.days.join(
											", "
										)}{" "}
										{
											selectedCourse.selectedRecitation
												.schedule.startTime
										}
										-
										{
											selectedCourse.selectedRecitation
												.schedule.endTime
										}
									</p>
								)}
								{selectedCourse.selectedLab && (
									<p>
										<span className="font-medium">
											Lab:
										</span>{" "}
										{selectedCourse.selectedLab.instructor}{" "}
										-{" "}
										{selectedCourse.selectedLab.schedule.days.join(
											", "
										)}{" "}
										{
											selectedCourse.selectedLab.schedule
												.startTime
										}
										-
										{
											selectedCourse.selectedLab.schedule
												.endTime
										}
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
