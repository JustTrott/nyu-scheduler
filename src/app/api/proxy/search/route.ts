import { APISearchRequest } from "@/lib/api/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const searchRequest: APISearchRequest = await request.json();

		const response = await fetch(
			"https://bulletins.nyu.edu/class-search/api/?page=fose&route=search",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				body: JSON.stringify(searchRequest),
			}
		);

		const data = await response.json();

		return NextResponse.json(
			{
				success: true,
				data,
			},
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=43200, stale-while-revalidate=43200", // 12 hours
				},
			}
		);
	} catch (error) {
		console.error("Error searching courses:", error);
		return NextResponse.json(
			{
				success: false,
				data: { results: [], count: 0, status: "error" },
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
