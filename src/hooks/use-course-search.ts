import { searchCourses } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useCourseSearch(semesterId: string, query: string) {
	const [debouncedQuery, setDebouncedQuery] = useState(query);
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		setIsTyping(true);
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
			setIsTyping(false);
		}, 1500); // 1.5 second delay

		return () => {
			clearTimeout(timer);
			setIsTyping(false);
		};
	}, [query]);

	const {
		data,
		isLoading: isSearching,
		...rest
	} = useQuery({
		queryKey: ["courses", semesterId, debouncedQuery],
		queryFn: () => searchCourses(semesterId, debouncedQuery),
		enabled: Boolean(
			semesterId && debouncedQuery && debouncedQuery.length >= 2
		),
		staleTime: 1000 * 60 * 60 * 12, // 12 hours cache
	});

	return {
		data,
		isLoading: isTyping || isSearching,
		...rest,
	};
}
