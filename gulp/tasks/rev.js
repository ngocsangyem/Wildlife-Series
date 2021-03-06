const gulp = require("gulp");

const { plugins, args, cfg, taskTarget, browserSync } = require("../utils");

const dirs = cfg.directories;
const dest = `${taskTarget}`;

gulp.task("rev", () => {
	return gulp
		.src([`${taskTarget}/styles/*.css`, `${taskTarget}/scripts/*.js`])
		.pipe(plugins.rev())
		.pipe(gulp.dest(dest))
		.pipe(plugins.rev.manifest("manifest.json"))
		.pipe(gulp.dest(dest));
});
