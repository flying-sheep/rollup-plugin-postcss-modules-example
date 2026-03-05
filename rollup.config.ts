import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss-modules'

import autoprefixer from 'autoprefixer'

import { glob } from 'glob'
import * as fs from 'node:fs'
import type { RollupOptions } from 'rollup'

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
		format: 'esm',
		sourcemap: true,
		paths: {
			'react': 'https://esm.sh/react@19',
			'react/jsx-runtime': 'https://esm.sh/react@19/jsx-runtime',
			'react-dom/client': 'https://esm.sh/react-dom@19/client',
		},
	},
	external: ['react', 'react/jsx-runtime', 'react-dom/client'],
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
