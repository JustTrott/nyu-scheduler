import { SiGithub } from "@icons-pack/react-simple-icons";

export function Header() {
	return (
		<header className="w-full bg-white py-4">
			<div className="container mx-auto px-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-800">
					NYU Scheduler
				</h1>
				<a
					href="https://github.com/JustTrott/nyu-scheduler"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-700 hover:text-gray-900 transition-colors"
					aria-label="View source on GitHub"
				>
					<SiGithub size={24} />
				</a>
			</div>
		</header>
	);
}
