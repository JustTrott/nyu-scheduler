import { Course } from "@/types/course";

interface CourseSearchProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	courses: Course[];
	onCourseSelect: (course: Course) => void;
	selectedCourseIds: string[];
	isLoading: boolean;
}

export function CourseSearch({
	searchQuery,
	onSearchChange,
	courses,
	onCourseSelect,
	selectedCourseIds,
	isLoading,
}: CourseSearchProps) {
	return (
		<div className="flex flex-col h-full">
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search courses..."
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
			</div>
			<div className="overflow-y-auto flex-1 pr-2">
				{isLoading ? (
					<div className="text-gray-500 text-center">
						Searching...
					</div>
				) : (
					<div className="flex flex-col gap-2">
						{courses.map((course) => {
							const isSelected = selectedCourseIds.includes(
								course.id
							);
							return (
								<button
									key={course.id}
									onClick={() =>
										!isSelected && onCourseSelect(course)
									}
									className={`text-left p-4 bg-white rounded-lg shadow-sm transition-all ${
										isSelected
											? "border-2 border-purple-500 cursor-default"
											: "hover:shadow-md cursor-pointer"
									}`}
								>
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-medium">
												{course.code}
											</h3>
											<p className="text-sm text-gray-600">
												{course.name}
											</p>
										</div>
										{isSelected && (
											<span className="text-sm text-purple-500 font-medium">
												Selected
											</span>
										)}
									</div>
								</button>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
