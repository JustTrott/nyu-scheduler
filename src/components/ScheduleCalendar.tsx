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

		selectedCourses.forEach((selectedCourse) => {
			// Add section events
			if (selectedCourse.selectedSection) {
				const section = selectedCourse.selectedSection;
				section.schedule.days.forEach((day) => {
					const event: Event = {
						title: `${selectedCourse.course.code} - ${selectedCourse.course.name}`,
						start: dayjs()
							.day(getDayIndex(day))
							.hour(
								parseInt(
									section.schedule.startTime.split(":")[0]
								)
							)
							.minute(
								parseInt(
									section.schedule.startTime.split(":")[1]
								)
							)
							.toDate(),
						end: dayjs()
							.day(getDayIndex(day))
							.hour(
								parseInt(section.schedule.endTime.split(":")[0])
							)
							.minute(
								parseInt(section.schedule.endTime.split(":")[1])
							)
							.toDate(),
						resource: {
							type: "section",
							professor: section.professor,
							location: section.schedule.location,
						},
					};
					allEvents.push(event);
				});
			}

			// Add recitation events
			if (selectedCourse.selectedRecitation) {
				const recitation = selectedCourse.selectedRecitation;
				recitation.schedule.days.forEach((day) => {
					const event: Event = {
						title: `${selectedCourse.course.code} - Recitation`,
						start: dayjs()
							.day(getDayIndex(day))
							.hour(
								parseInt(
									recitation.schedule.startTime.split(":")[0]
								)
							)
							.minute(
								parseInt(
									recitation.schedule.startTime.split(":")[1]
								)
							)
							.toDate(),
						end: dayjs()
							.day(getDayIndex(day))
							.hour(
								parseInt(
									recitation.schedule.endTime.split(":")[0]
								)
							)
							.minute(
								parseInt(
									recitation.schedule.endTime.split(":")[1]
								)
							)
							.toDate(),
						resource: {
							type: "recitation",
							instructor: recitation.instructor,
							location: recitation.schedule.location,
						},
					};
					allEvents.push(event);
				});
			}

			// Add lab events
			if (selectedCourse.selectedLab) {
				const lab = selectedCourse.selectedLab;
				lab.schedule.days.forEach((day) => {
					const event: Event = {
						title: `${selectedCourse.course.code} - Lab`,
						start: dayjs()
							.day(getDayIndex(day))
							.hour(
								parseInt(lab.schedule.startTime.split(":")[0])
							)
							.minute(
								parseInt(lab.schedule.startTime.split(":")[1])
							)
							.toDate(),
						end: dayjs()
							.day(getDayIndex(day))
							.hour(parseInt(lab.schedule.endTime.split(":")[0]))
							.minute(
								parseInt(lab.schedule.endTime.split(":")[1])
							)
							.toDate(),
						resource: {
							type: "lab",
							instructor: lab.instructor,
							location: lab.schedule.location,
						},
					};
					allEvents.push(event);
				});
			}
		});

		return allEvents;
	}, [selectedCourses]);

	return (
		<div className="h-full p-4">
			<Calendar
				localizer={localizer}
				events={events}
				defaultView={Views.WEEK}
				views={[Views.WEEK]}
				min={dayjs().hour(8).minute(0).toDate()}
				max={dayjs().hour(22).minute(0).toDate()}
				formats={{
					timeGutterFormat: "h:mm A",
					eventTimeRangeFormat: ({ start, end }) =>
						`${dayjs(start).format("h:mm A")} - ${dayjs(end).format(
							"h:mm A"
						)}`,
				}}
				components={{
					event: EventWrapper,
				}}
			/>
		</div>
	);
}

function getDayIndex(day: string): number {
	const dayMap: Record<string, number> = {
		Sun: 0,
		Mon: 1,
		Tue: 2,
		Wed: 3,
		Thu: 4,
		Fri: 5,
		Sat: 6,
	};
	return dayMap[day] || 0;
}

interface EventWrapperProps {
	event: Event;
}

function EventWrapper({ event }: EventWrapperProps) {
	const resource = event.resource as {
		type: "section" | "recitation" | "lab";
		professor?: string;
		instructor?: string;
		location: string;
	};

	const getEventClass = () => {
		switch (resource.type) {
			case "section":
				return "bg-purple-100 border-purple-300 text-purple-900";
			case "recitation":
				return "bg-blue-100 border-blue-300 text-blue-900";
			case "lab":
				return "bg-green-100 border-green-300 text-green-900";
			default:
				return "";
		}
	};

	return (
		<div
			className={`p-1 h-full border rounded ${getEventClass()} overflow-hidden`}
		>
			<div className="font-medium text-sm truncate">{event.title}</div>
			<div className="text-xs truncate">
				{resource.professor || resource.instructor}
			</div>
			{resource.location && (
				<div className="text-xs truncate">{resource.location}</div>
			)}
		</div>
	);
}
