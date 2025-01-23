import { Course } from "@/types/course";

export const MOCK_COURSES: Course[] = [
	{
		id: "cs-101",
		code: "CS-UA 101",
		name: "Introduction to Computer Science",
		description: "Basic concepts of computer science and programming",
		credits: 4,
		sections: [
			{
				id: "cs-101-1",
				professor: "John Doe",
				schedule: {
					days: ["Mon", "Wed"],
					startTime: "09:00",
					endTime: "10:15",
					location: "CIWW 102",
				},
			},
			{
				id: "cs-101-2",
				professor: "Jane Smith",
				schedule: {
					days: ["Tue", "Thu"],
					startTime: "11:00",
					endTime: "12:15",
					location: "CIWW 201",
				},
			},
		],
		recitations: [
			{
				id: "cs-101-r1",
				instructor: "Graduate TA 1",
				schedule: {
					days: ["Fri"],
					startTime: "09:00",
					endTime: "10:15",
					location: "CIWW 101",
				},
			},
			{
				id: "cs-101-r2",
				instructor: "Graduate TA 2",
				schedule: {
					days: ["Fri"],
					startTime: "10:30",
					endTime: "11:45",
					location: "CIWW 101",
				},
			},
		],
		labs: [],
	},
	{
		id: "cs-102",
		code: "CS-UA 102",
		name: "Data Structures",
		description: "Advanced programming concepts and data structures",
		credits: 4,
		sections: [
			{
				id: "cs-102-1",
				professor: "Alan Turing",
				schedule: {
					days: ["Mon", "Wed"],
					startTime: "14:00",
					endTime: "15:15",
					location: "CIWW 312",
				},
			},
		],
		recitations: [
			{
				id: "cs-102-r1",
				instructor: "Graduate TA 3",
				schedule: {
					days: ["Fri"],
					startTime: "13:00",
					endTime: "14:15",
					location: "CIWW 201",
				},
			},
		],
		labs: [],
	},
	{
		id: "chem-101",
		code: "CHEM-UA 101",
		name: "General Chemistry I",
		description: "Fundamental concepts of chemistry",
		credits: 5,
		sections: [
			{
				id: "chem-101-1",
				professor: "Marie Curie",
				schedule: {
					days: ["Mon", "Wed"],
					startTime: "11:00",
					endTime: "12:15",
					location: "Silver 505",
				},
			},
		],
		recitations: [],
		labs: [
			{
				id: "chem-101-l1",
				instructor: "Lab TA 3",
				schedule: {
					days: ["Thu"],
					startTime: "13:00",
					endTime: "15:50",
					location: "Silver Lab 301",
				},
			},
		],
	},
	{
		id: "phys-101",
		code: "PHYS-UA 101",
		name: "General Physics I",
		description: "Introduction to mechanics and thermodynamics",
		credits: 5,
		sections: [
			{
				id: "phys-101-1",
				professor: "Isaac Newton",
				schedule: {
					days: ["Tue", "Thu"],
					startTime: "09:30",
					endTime: "10:45",
					location: "Meyer 121",
				},
			},
		],
		recitations: [
			{
				id: "phys-101-r1",
				instructor: "Graduate TA 4",
				schedule: {
					days: ["Wed"],
					startTime: "15:00",
					endTime: "16:15",
					location: "Meyer 201",
				},
			},
		],
		labs: [
			{
				id: "phys-101-l1",
				instructor: "Lab TA 4",
				schedule: {
					days: ["Fri"],
					startTime: "13:00",
					endTime: "15:50",
					location: "Meyer Lab 101",
				},
			},
		],
	},
	{
		id: "psych-101",
		code: "PSYCH-UA 101",
		name: "Introduction to Psychology",
		description: "Survey of psychological concepts and methods",
		credits: 4,
		sections: [
			{
				id: "psych-101-1",
				professor: "Sigmund Freud",
				schedule: {
					days: ["Mon", "Wed"],
					startTime: "15:30",
					endTime: "16:45",
					location: "Silver 207",
				},
			},
		],
		recitations: [
			{
				id: "psych-101-r1",
				instructor: "Graduate TA 5",
				schedule: {
					days: ["Fri"],
					startTime: "11:00",
					endTime: "12:15",
					location: "Silver 208",
				},
			},
		],
		labs: [],
	},
	{
		id: "econ-101",
		code: "ECON-UA 101",
		name: "Introduction to Macroeconomics",
		description: "Basic principles of economics and economic systems",
		credits: 4,
		sections: [
			{
				id: "econ-101-1",
				professor: "Adam Smith",
				schedule: {
					days: ["Tue", "Thu"],
					startTime: "14:00",
					endTime: "15:15",
					location: "GCASL 95",
				},
			},
		],
		recitations: [
			{
				id: "econ-101-r1",
				instructor: "Graduate TA 6",
				schedule: {
					days: ["Mon"],
					startTime: "09:00",
					endTime: "10:15",
					location: "GCASL 275",
				},
			},
		],
		labs: [],
	},
	{
		id: "bio-101",
		code: "BIOL-UA 101",
		name: "Principles of Biology I",
		description: "Introduction to biology with laboratory sessions",
		credits: 4,
		sections: [
			{
				id: "bio-101-1",
				professor: "Sarah Connor",
				schedule: {
					days: ["Mon", "Wed"],
					startTime: "10:00",
					endTime: "11:15",
					location: "Silver 401",
				},
			},
		],
		recitations: [],
		labs: [
			{
				id: "bio-101-l1",
				instructor: "Lab TA 1",
				schedule: {
					days: ["Tue"],
					startTime: "09:00",
					endTime: "10:50",
					location: "Silver Lab 201",
				},
			},
			{
				id: "bio-101-l2",
				instructor: "Lab TA 2",
				schedule: {
					days: ["Thu"],
					startTime: "09:00",
					endTime: "10:50",
					location: "Silver Lab 201",
				},
			},
		],
	},
	{
		id: "math-121",
		code: "MATH-UA 121",
		name: "Calculus I",
		description: "Introduction to calculus",
		credits: 4,
		sections: [
			{
				id: "math-121-1",
				professor: "Alice Johnson",
				schedule: {
					days: ["Mon", "Wed"],
					startTime: "14:00",
					endTime: "15:15",
					location: "CIWW 305",
				},
			},
		],
		recitations: [],
		labs: [],
	},
];
