import { defineConfig } from "rollup";
import serve from "rollup-plugin-serve";
import { babel } from "@rollup/plugin-babel";
import htmlTemplate from 'rollup-plugin-generate-html-template';
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";
import typescript from "@rollup/plugin-typescript";
import image from "@rollup/plugin-image";
import liveReload from "rollup-plugin-livereload";
import embedCss from 'rollup-plugin-embed-css';
import copy from 'rollup-plugin-copy';

const extensions = ['.js', '.jsx', '.json', '.node', ".ts", ".tsx"];

export default defineConfig({
    input: "./src/index.tsx",
    output: {
        dir: "dist",
        format: "iife",
        assetFileNames: "[name]-[hash][extname]",
        banner: () => ("/** \n * Built with love by Stephen: \n * Email - sndegwa.n@outlook.com \n * Github - github.com/StevNdegwa\n**/")
    },
    plugins: [
        nodeResolve({
            extensions
        }),
        commonjs(),
        typescript({
            allowSyntheticDefaultImports: true,
            jsx: "react"
        }),
        babel({
            babelHelpers: "bundled",
            exclude: /node_modules/,
            extensions,
            presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        image(),
        embedCss(),
        serve({
            open: true,
            contentBase: "dist",
            host: "localhost",
            port: "2400",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            }
        }),
        liveReload(),
        htmlTemplate({
            template: "./public/index.html",
            target: "index.html",

        }),
        copy({
            targets: [
                { src: ['favicon.png'], dest: 'dist' }
            ]
        })
    ]
})