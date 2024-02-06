import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import path from "path";

const packages = [];

const genPackages = () => {
	for (const name of fs.readdirSync("packages")) {
		packages.push({
			input: `./packages/${name}/src/index.ts`,
			output: { file: `./packages/${name}/lib/index.js`, format: "es" },
			plugins: [
				typescript({ tsconfig: './tsconfig.json', include: [`./packages/${name}/src/index.ts`] }),
			],
		});
	}

	return packages;
};

export default () => {
	console.log("-----------------------------------------", path.resolve());

	return genPackages();
};
