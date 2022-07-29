import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
// import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import Css from 'rollup-plugin-css-only';
import fs from 'fs'

export default {
    input: 'src/index.ts',
    output: [
        { banner: '/*eslint-disable */', file: 'dist/cjs.index.js', format: 'cjs', name: 'ycomponent' },
        { banner: '/*eslint-disable */', file: 'dist/esm.index.js', format: 'es', name: 'ycomponent' },
        { banner: '/*eslint-disable */', file: 'dist/umd.index.js', format: 'umd', name: 'ycomponent' },
    ],
    plugins: [
        typescript(),
        resolve(),
        // postcss(),
        Css({
            output: function (styles, styleNodes) {
                  console.log(styleNodes)
                  fs.writeFileSync('dist/style.css', styles)
                }
        }),
        babel({
            exclude: "node_modules/**",
            runtimeHelpers: true
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react-is/index.js': ['isFragment', 'isMemo'],
                'node_modules/react/jsx-runtime.js': ['jsx'],
            }
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        terser({
            output: {
                comments: function(node, comment) {
                    var text = comment.value;
                    var type = comment.type;
                    if (type == "comment2") {
                        // multiline comment
                        return /eslint-disable/i.test(text);
                    }
                }
            }
        }),

    ],
    external: ['react', 'react-dom', 'antd'],
};