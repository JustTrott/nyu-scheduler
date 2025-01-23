"use client";

interface Tab {
	id: string;
	label: string;
}

interface TabsProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
	return (
		<div className="flex md:hidden border-b bg-white">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={`flex-1 py-3 text-sm font-medium border-b-2 ${
						activeTab === tab.id
							? "text-purple-600 border-purple-500"
							: "text-gray-500 border-transparent"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
