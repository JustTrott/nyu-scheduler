import { APISearchSection, GroupedAPISearchSection } from "./types";

export function groupSections(
	sections: APISearchSection[]
): GroupedAPISearchSection[] {
	const groupedMap = new Map<string, GroupedAPISearchSection>();

	sections.forEach((section) => {
		const courseKey = section.code;
		if (!groupedMap.has(courseKey)) {
			groupedMap.set(courseKey, {
				code: section.code,
				title: section.title,
				lectures: [],
				recitations: [],
				labs: [],
			});
		}

		const group = groupedMap.get(courseKey)!;

		switch (section.schd) {
			case "LEC":
			case "SEM":
				group.lectures.push(section);
				break;
			case "RCT":
				group.recitations.push(section);
				break;
			case "LAB":
				group.labs.push(section);
				break;
		}
	});

	return Array.from(groupedMap.values());
}

export function parseMeetingDays(day: string): string[] {
	// API uses numbers 0-6 for days (0 = Monday)
	const dayMap: Record<string, string> = {
		"0": "Mon",
		"1": "Tue",
		"2": "Wed",
		"3": "Thu",
		"4": "Fri",
		"5": "Sat",
		"6": "Sun",
	};
	return [dayMap[day] || ""];
}

export function formatTime(time: string): string {
	// API uses 24-hour format like "1410" for 2:10 PM
	if (!time) return "";
	const hours = time.slice(0, -2);
	const minutes = time.slice(-2);
	return `${hours}:${minutes}`;
}
