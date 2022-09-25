import gulp from "gulp";
import gulpTs from "gulp-typescript";
import TsMacros from "ts-macros";
import ts from "typescript";

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
    return gulp.src("src/**/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("dist"));
});
