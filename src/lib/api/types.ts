export interface APIResponse<T> {
	success: boolean;
	data: T;
	error?: string;
}

export interface APISourceDB {
	code: string;
	name: string;
	short: string;
	contains: string;
	status: string;
	flags: string;
}

export interface APIConfig {
	srcDBs: APISourceDB[];
	[key: string]: any; // for other config fields we might need later
}

export interface APISearchCriterion {
	field: string;
	value: string;
}

export interface APISearchRequest {
	other: {
		srcdb: string;
	};
	criteria: APISearchCriterion[];
}

export interface APISearchSection {
	key: string;
	code: string;
	title: string;
	crn: string;
	no: string; // "001", "002", "REC1", "REC2", etc.
	total: string;
	schd: string; // "LEC", "RCT", etc.
	meets: string;
	meetingTimes: string; // JSON string of meeting times
	instr: string;
	start_date: string;
	end_date: string;
}

export interface GroupedAPISearchSection {
	code: string;
	title: string;
	lectures: APISearchSection[];
	recitations: APISearchSection[];
	labs: APISearchSection[];
}

export interface APISearchResponse {
	results: APISearchSection[];
	count: number;
	status: string;
	[key: string]: any; // for other fields we might need later
}
