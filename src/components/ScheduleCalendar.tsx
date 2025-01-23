"use client";

import { SelectedCourse } from "@/types/course";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Calendar, dayjsLocalizer, Event, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./ScheduleCalendar.css";

const localizer = dayjsLocalizer(dayjs);

interface ScheduleCalendarProps {
	selectedCourses: SelectedCourse[];
}

export function ScheduleCalendar({ selectedCourses }: ScheduleCalendarProps) {
	const events = useMemo(() => {
		const allEvents: Event[] = [];

		console.log(
			"Converting courses to events. Selected courses:",
			selectedCourses
		);

		selectedCourses.forEach((selectedCourse) => {
			// Add section events
			if (selectedCourse.selectedSection) {
				const section = selectedCourse.selectedSection;
				console.log(
					"Processing section for course:",
					selectedCourse.course.code,
					section
				);

				section.schedule.days.forEach((day) => {
					const dayIndex = getDayIndex(day);
					if (dayIndex !== -1) {
						const event = {
							title: `${selectedCourse.course.code} - Section`,
							start: getDateFromTimeString(
								dayIndex,
								section.schedule.startTime
							),
							end: getDateFromTimeString(
								dayIndex,
								section.schedule.endTime
							),
							resource: {
								type: "section",
								course: selectedCourse.course,
								location: section.schedule.location,
								instructor: section.professor,
							},
						};
						console.log("Created section event:", event);
						allEvents.push(event);
					}
				});
			}

			// Add recitation events
			if (selectedCourse.selectedRecitation) {
				const recitation = selectedCourse.selectedRecitation;
				console.log(
					"Processing recitation for course:",
					selectedCourse.course.code,
					recitation
				);

				recitation.schedule.days.forEach((day) => {
					const dayIndex = getDayIndex(day);
					if (dayIndex !== -1) {
						const event = {
							title: `${selectedCourse.course.code} - Recitation`,
							start: getDateFromTimeString(
								dayIndex,
								recitation.schedule.startTime
							),
							end: getDateFromTimeString(
								dayIndex,
								recitation.schedule.endTime
							),
							resource: {
								type: "recitation",
								course: selectedCourse.course,
								location: recitation.schedule.location,
								instructor: recitation.instructor,
							},
						};
						console.log("Created recitation event:", event);
						allEvents.push(event);
					}
				});
			}

			// Add lab events
			if (selectedCourse.selectedLab) {
				const lab = selectedCourse.selectedLab;
				console.log(
					"Processing lab for course:",
					selectedCourse.course.code,
					lab
				);

				lab.schedule.days.forEach((day) => {
					const dayIndex = getDayIndex(day);
					if (dayIndex !== -1) {
						const event = {
							title: `${selectedCourse.course.code} - Lab`,
							start: getDateFromTimeString(
								dayIndex,
								lab.schedule.startTime
							),
							end: getDateFromTimeString(
								dayIndex,
								lab.schedule.endTime
							),
							resource: {
								type: "lab",
								course: selectedCourse.course,
								location: lab.schedule.location,
								instructor: lab.instructor,
							},
						};
						console.log("Created lab event:", event);
						allEvents.push(event);
					}
				});
			}
		});

		console.log("Final events array:", allEvents);
		return allEvents;
	}, [selectedCourses]);

	return (
		<div className="h-full">
			<Calendar
				defaultView={Views.WORK_WEEK}
				views={[Views.WORK_WEEK]}
				events={events}
				localizer={localizer}
				className="h-full"
				min={dayjs().set("hour", 6).set("minute", 0).toDate()}
				max={dayjs().set("hour", 21).set("minute", 0).toDate()}
				onDrillDown={() => {}}
				// components={{
				// 	eventWrapper: EventWrapper,
				// }}
				toolbar={false}
				step={30}
				timeslots={2}
			/>
		</div>
	);
}

// Helper function to convert day string to index (0 = Sunday, 1 = Monday, etc.)
function getDayIndex(day: string): number {
	const days = {
		Sun: 0,
		Mon: 1,
		Tue: 2,
		Wed: 3,
		Thu: 4,
		Fri: 5,
		Sat: 6,
	};
	return days[day as keyof typeof days] ?? -1;
}

// Helper function to create Date object from time string
function getDateFromTimeString(dayIndex: number, timeString: string): Date {
	const [hours, minutes] = timeString.split(":").map(Number);
	return dayjs()
		.startOf("week")
		.add(dayIndex, "day")
		.set("hour", hours)
		.set("minute", minutes)
		.toDate();
}

// Custom event component to show more details. For now, we're not using this.
// function EventWrapper({ event }: { event: Event }) {
// 	const resource = event.resource as {
// 		type: "section" | "recitation" | "lab";
// 		course: Course;
// 		location: string;
// 		instructor: string;
// 	};

// 	const typeColors = {
// 		section: "bg-purple-100 border-purple-300",
// 		recitation: "bg-blue-100 border-blue-300",
// 		lab: "bg-green-100 border-green-300",
// 	};

// 	return (
// 		<div
// 			className={`p-1 rounded border ${
// 				typeColors[resource.type]
// 			} overflow-hidden text-xs`}
// 		>
// 			<div className="font-medium">{event.title}</div>
// 			<div>{resource.location}</div>
// 			<div>{resource.instructor}</div>
// 		</div>
// 	);
// }
