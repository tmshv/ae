import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import less from 'rollup-plugin-less'

// delete old typings to avoid issues
require('fs').unlink('dist/index.d.ts', (err) => { });

export default {
    input: 'src/index.ts',
    output: [
        // {
        //     file: pkg.main,
        //     format: 'cjs'
        // },
        // {
        //     file: pkg.module,
        //     format: 'es'
        // },
        {
            file: pkg.browser,
            format: 'iife',
            name: 'TextSelect'
        }
    ],
    // external: [
    //     ...Object.keys(pkg.dependencies || {})
    // ],
    plugins: [
        less(),
        typescript({
            typescript: require('typescript'),
            tsconfigOverride: {
                compilerOptions: {
                    jsx: 'react',
                    declaration: true,
                    allowJs: false,
                    isolatedModules: false,
                },
            },
        }),
        terser()
    ]
}
