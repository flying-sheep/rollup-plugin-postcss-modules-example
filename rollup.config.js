import postcss from 'rollup-plugin-postcss-modules'
import typescript from 'rollup-plugin-typescript2'

import autoprefixer from 'autoprefixer'


import fs from 'fs'
import glob from 'glob'

/* initialize CSS files because of a catch-22 situation:
   https://github.com/rollup/rollup/issues/1404 */
glob.sync('src/**/*.css').forEach((css) => {  // Use forEach because https://github.com/rollup/rollup/issues/1873
	const definition = `${css}.d.ts`
	if (!fs.existsSync(definition))
		fs.writeFileSync(definition, 'const mod: { [cls: string]: string }\nexport default mod\n')
})

export default {
	input: 'src/index.tsx',
	output: {
		file: 'dist/bundle.js',
		format: 'iife',
	},
	// using script tags instead of more rollup plugins for this demo
	external: ['react', 'react-dom'],
	globals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		postcss({
			/* `extract: true` should extract to `${basename(dest, '.js')}.css`, but is currently broken:
			   https://github.com/egoist/rollup-plugin-postcss/issues/43 */
			extract: 'dist/bundle.css',
			plugins: [autoprefixer()],
			writeDefinitions: true,
			// modules: { ... }
		}),
		typescript(),
	],
}
