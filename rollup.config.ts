import postcss from 'rollup-plugin-postcss-modules'
import typescript from '@rollup/plugin-typescript'

import autoprefixer from 'autoprefixer'

import * as fs from 'node:fs'
import glob from 'glob'
import { RollupOptions } from 'rollup'

/* initialize CSS files because of a catch-22 situation:
   https://github.com/rollup/rollup/issues/1404 */
for (const css of glob.sync('src/**/*.css')) {
	const definition = `${css}.d.ts`
	if (!fs.existsSync(definition))
		fs.writeFileSync(definition, 'const mod: { [cls: string]: string }\nexport default mod\n')
}

const conf: RollupOptions = {
	input: 'src/index.tsx',
	output: {
		file: 'dist/bundle.js',
		format: 'iife',
		sourcemap: true,
		globals: {
			'react': 'React',
			'react-dom': 'ReactDOM',
		},
	},
	// using script tags instead of more rollup plugins for this demo
	external: ['react', 'react-dom'],
	plugins: [
		postcss({
			extract: true,
			plugins: [autoprefixer()],
			writeDefinitions: true,
			// modules: { ... }
		}),
		typescript(),
	],
}

export default conf
