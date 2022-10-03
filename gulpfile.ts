import gulp from "gulp";
import gulpTs from "gulp-typescript";
import TsMacros from "ts-macros";
import ts from "typescript";
import babel from 'gulp-babel';
import merge from 'merge-stream';

const clean = require('gulp-clean') as () => NodeJS.ReadWriteStream;

const tsProject = gulpTs.createProject("tsconfig.json", {
    getCustomTransformers: (program?: ts.Program) => {
        if (program === undefined) throw new Error("Program is undefined");
        return {
            before: [
                TsMacros(program!) as unknown as ts.TransformerFactory<ts.SourceFile>
            ]
        };
    },
    module: "esnext",
    declaration: true
});

gulp.task("default", () => {
    const cleanStream = gulp.src("dist", { read: false, allowEmpty: true })
        .pipe(clean());

    const tsBuildResult = gulp.src("src/**/*.ts")
        .pipe(tsProject());

    const jsBuildResult = tsBuildResult.js
        .pipe(babel({
            plugins: [
                "babel-plugin-remove-unused-import",
            ]
        }));

    return merge(
        cleanStream,
        merge([
            tsBuildResult.dts,
            jsBuildResult
        ]).pipe(gulp.dest("dist"))
    );
});
