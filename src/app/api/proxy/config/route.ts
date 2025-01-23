import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch(
			"https://bulletins.nyu.edu/class-search/",
			{
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
			}
		);

		const html = await response.text();

		// Extract the config from the script tag
		const configMatch = html.match(
			/var foseConfig = ({[\s\S]*?});[\s\S]*?<\/script>/
		);

		if (!configMatch) {
			throw new Error("Could not find config in HTML");
		}

		// Parse the config object
		const configStr = configMatch[1];
		const config = eval(`(${configStr})`); // Safe to use eval here as we trust the NYU source

		return NextResponse.json(
			{
				success: true,
				data: config,
			},
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=43200, stale-while-revalidate=43200", // 12 hours
				},
			}
		);
	} catch (error) {
		console.error("Error fetching config:", error);
		return NextResponse.json(
			{
				success: false,
				data: { srcDBs: [] },
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
