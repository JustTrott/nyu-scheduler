import { CSPostHogProvider } from "@/providers/posthog-provider";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "NYU Scheduler",
	description:
		"Pick your classes and see your schedule. Made by a student, for students.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<QueryProvider>
					<CSPostHogProvider>{children}</CSPostHogProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
