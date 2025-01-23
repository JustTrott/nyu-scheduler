"use client";

import { ScheduleCalendar } from "@/components/ScheduleCalendar";
import { CoursePicker } from "@/components/course-picker/course-picker";
import { Header } from "@/components/header/header";
import { Tabs } from "@/components/tabs/tabs";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useSemesters } from "@/hooks/use-semesters";
import { SelectedCourse } from "@/types/course";
import { useEffect, useState } from "react";

const tabs = [
	{ id: "search", label: "Course Search" },
	{ id: "calendar", label: "Schedule" },
];

export default function Home() {
	const { data: semesters } = useSemesters();
	const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");

	// Set initial semester when data is loaded
	useEffect(() => {
		if (semesters?.length && !selectedSemesterId) {
			setSelectedSemesterId(semesters[0].id);
		}
	}, [semesters, selectedSemesterId]);

	// Only create storage key and load data when we have a valid semester ID
	const storageKey = selectedSemesterId
		? `nyu-scheduler-courses-${selectedSemesterId}`
		: null;

	const [selectedCourses, setSelectedCourses] = useLocalStorage<
		SelectedCourse[]
	>(
		storageKey || "temp-key", // Use a temporary key if we don't have a semester yet
		[]
	);

	// Clear courses when semester changes
	useEffect(() => {
		if (storageKey) {
			const savedCourses = localStorage.getItem(storageKey);
			if (savedCourses) {
				setSelectedCourses(JSON.parse(savedCourses));
			} else {
				setSelectedCourses([]);
			}
		}
	}, [storageKey, setSelectedCourses]);

	const [activeTab, setActiveTab] = useState("search");

	// Add logging when courses change
	const handleCoursesChange = (newCourses: SelectedCourse[]) => {
		setSelectedCourses(newCourses);
	};

	return (
		<main className="h-screen max-h-screen flex flex-col">
			<Header />
			<div className="flex-grow flex overflow-hidden relative">
				{/* Course Picker - Hidden on mobile when calendar tab is active */}
				<div
					className={`w-96 border-r overflow-auto md:block ${
						activeTab === "search" ? "block" : "hidden"
					}`}
				>
					<CoursePicker
						onCoursesChange={handleCoursesChange}
						selectedCourses={selectedCourses}
						selectedSemesterId={selectedSemesterId}
						onSemesterChange={setSelectedSemesterId}
					/>
				</div>
				{/* Calendar - Hidden on mobile when search tab is active */}
				<div
					className={`flex-grow md:block ${
						activeTab === "calendar" ? "block" : "hidden"
					}`}
				>
					<ScheduleCalendar selectedCourses={selectedCourses} />
				</div>
			</div>
			{/* Tabs - Only visible on mobile */}
			<Tabs
				tabs={tabs}
				activeTab={activeTab}
				onTabChange={setActiveTab}
			/>
		</main>
	);
}
