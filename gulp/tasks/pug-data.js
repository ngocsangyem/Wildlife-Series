const gulp = require("gulp");
const path = require("path");
const merge = require("gulp-merge-json");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const { RemoveExtension } = require("../helpers/remove-extension");
const { CapitalizeWord } = require("../helpers/capitalize");

const dirs = cfg.directories;
const dirsDev = dirs.development;
const entries = cfg.directories.entries;

gulp.task("pug:data", () => {
	return gulp
		.src([
			`${dirsDev.source}${dirsDev.app}${dirsDev.component}**/*.json`,
			`${dirsDev.source}${dirsDev.app}${dirsDev.pages}**/*.json`,
			`${dirsDev.source}${dirsDev.app}seo.json`
		])
		.pipe(
			merge({
				fileName: entries.data,
				edit: (json, file) => {
					// Extract the filename and strip the extension
					const filename = path.basename(file.path),
						primaryKey = RemoveExtension(CapitalizeWord(filename));

					// Set the filename as the primary key for our JSON data
					const data = {};
					data[primaryKey] = json;

					return data;
				}
			})
		)
		.pipe(gulp.dest(`${dirsDev.source}${dirsDev.app}data`));
});
