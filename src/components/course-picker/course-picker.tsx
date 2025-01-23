"use client";

import { SemesterSelector } from "@/components/semester-selector/semester-selector";
import { useCourseSearch } from "@/hooks/use-course-search";
import { useSemesters } from "@/hooks/use-semesters";
import { groupSections, parseMeetingTimes } from "@/lib/api/helpers";
import { Course, SelectedCourse } from "@/types/course";
import { useState } from "react";
import { CourseSearch } from "./course-search";
import { CourseSelectionModal } from "./course-selection-modal";
import { SelectedCourses } from "./selected-courses";

interface CoursePickerProps {
	selectedCourses: SelectedCourse[];
	onCoursesChange: (courses: SelectedCourse[]) => void;
	selectedSemesterId: string;
	onSemesterChange: (semesterId: string) => void;
}

export function CoursePicker({
	selectedCourses,
	onCoursesChange,
	selectedSemesterId,
	onSemesterChange,
}: CoursePickerProps) {
	const { data: semesters, isLoading: isLoadingSemesters } = useSemesters();
	const [searchQuery, setSearchQuery] = useState("");
	const { data: searchResults, isLoading: isSearching } = useCourseSearch(
		selectedSemesterId,
		searchQuery
	);
	const [courseToSelect, setCourseToSelect] = useState<Course | null>(null);
	const [courseToEdit, setCourseToEdit] = useState<SelectedCourse | null>(
		null
	);

	const courses: Course[] = searchResults?.success
		? groupSections(searchResults.data.results).map((group) => ({
				id: group.code,
				code: group.code,
				name: group.title,
				description: "",
				credits: parseInt(group.lectures[0]?.total || "0"),
				sections: group.lectures.map((lec) => {
					const { days, startTime, endTime } = parseMeetingTimes(
						lec.meetingTimes
					);
					return {
						id: lec.crn,
						professor: lec.instr || "TBA",
						schedule: {
							days,
							startTime,
							endTime,
							location: "",
						},
					};
				}),
				recitations: group.recitations.map((rec) => {
					const { days, startTime, endTime } = parseMeetingTimes(
						rec.meetingTimes
					);
					return {
						id: rec.crn,
						instructor: rec.instr || "TBA",
						schedule: {
							days,
							startTime,
							endTime,
							location: "",
						},
					};
				}),
				labs: group.labs.map((lab) => {
					const { days, startTime, endTime } = parseMeetingTimes(
						lab.meetingTimes
					);
					return {
						id: lab.crn,
						instructor: lab.instr || "TBA",
						schedule: {
							days,
							startTime,
							endTime,
							location: "",
						},
					};
				}),
		  }))
		: [];

	const handleCourseSelect = (course: Course) => {
		if (selectedCourses.some((sc) => sc.course.id === course.id)) return;
		setCourseToSelect(course);
	};

	const handleConfirmSelection = (
		courseId: string,
		sectionId: string,
		recitationId?: string,
		labId?: string
	) => {
		const course = courses.find((c) => c.id === courseId);
		if (!course) return;

		const selectedSection = course.sections.find((s) => s.id === sectionId);
		const selectedRecitation = recitationId
			? course.recitations.find((r) => r.id === recitationId)
			: undefined;
		const selectedLab = labId
			? course.labs.find((l) => l.id === labId)
			: undefined;

		onCoursesChange([
			...selectedCourses,
			{
				course,
				selectedSection,
				selectedRecitation,
				selectedLab,
			},
		]);
		setCourseToSelect(null);
	};

	const handleConfirmEdit = (
		courseId: string,
		sectionId: string,
		recitationId?: string,
		labId?: string
	) => {
		const course = courses.find((c) => c.id === courseId);
		if (!course) return;

		const selectedSection = course.sections.find((s) => s.id === sectionId);
		const selectedRecitation = recitationId
			? course.recitations.find((r) => r.id === recitationId)
			: undefined;
		const selectedLab = labId
			? course.labs.find((l) => l.id === labId)
			: undefined;

		onCoursesChange(
			selectedCourses.map((sc) =>
				sc.course.id === courseId
					? {
							...sc,
							selectedSection,
							selectedRecitation,
							selectedLab,
					  }
					: sc
			)
		);
		setCourseToEdit(null);
	};

	const handleRemoveCourse = (courseId: string) => {
		onCoursesChange(
			selectedCourses.filter((sc) => sc.course.id !== courseId)
		);
	};

	if (isLoadingSemesters) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="text-gray-500">Loading semesters...</div>
			</div>
		);
	}

	return (
		<div className="max-h-full h-full flex flex-col p-4 gap-4 bg-gray-50">
			<div>
				<SemesterSelector
					semesters={semesters || []}
					selectedSemesterId={selectedSemesterId}
					onSemesterChange={onSemesterChange}
				/>
			</div>
			<div className="h-[calc(50%-2rem)] flex flex-col min-h-0">
				<CourseSearch
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					courses={courses}
					onCourseSelect={handleCourseSelect}
					selectedCourseIds={selectedCourses.map(
						(sc) => sc.course.id
					)}
					isLoading={isSearching}
				/>
			</div>
			<div className="h-[calc(50%-2rem)] flex flex-col min-h-0">
				<SelectedCourses
					selectedCourses={selectedCourses}
					onRemoveCourse={handleRemoveCourse}
					onEditCourse={(course) => setCourseToEdit(course)}
				/>
			</div>

			{courseToSelect && (
				<CourseSelectionModal
					course={courseToSelect}
					onConfirm={handleConfirmSelection}
					onCancel={() => setCourseToSelect(null)}
					initialSection={undefined}
					initialRecitation={undefined}
				/>
			)}

			{courseToEdit && (
				<CourseSelectionModal
					course={courseToEdit.course}
					onConfirm={handleConfirmEdit}
					onCancel={() => setCourseToEdit(null)}
					initialSection={courseToEdit.selectedSection}
					initialRecitation={courseToEdit.selectedRecitation}
				/>
			)}
		</div>
	);
}
