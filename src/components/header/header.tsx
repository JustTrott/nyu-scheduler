import { SiGithub } from "@icons-pack/react-simple-icons";

export function Header() {
	return (
		<header className="w-full bg-white py-4">
			<div className="container mx-auto px-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-800">
					NYU Scheduler
				</h1>
				<div className="flex items-center gap-4">
					<a
						href="https://bulletins.nyu.edu/class-search/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-purple-600 hover:text-purple-700 transition-colors text-sm"
					>
						Official class search ↗
					</a>
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
			</div>
		</header>
	);
}
