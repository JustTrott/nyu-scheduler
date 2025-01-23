export interface Schedule {
	days: string[];
	startTime: string;
	endTime: string;
	location: string;
}

export interface Section {
	id: string;
	professor: string;
	schedule: Schedule;
}

export interface Recitation {
	id: string;
	instructor: string;
	schedule: Schedule;
}

export interface Lab {
	id: string;
	instructor: string;
	schedule: Schedule;
}

export interface Course {
	id: string;
	code: string;
	name: string;
	description: string;
	credits: number;
	sections: Section[];
	recitations: Recitation[];
	labs: Lab[];
}

export interface SelectedCourse {
	course: Course;
	selectedSection?: Section;
	selectedRecitation?: Recitation;
	selectedLab?: Lab;
}
