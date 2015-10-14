# gulp-sass-autoprefixer-sourcemaps

一个使用 gulp 编译 sass 的测试项目，包含功能 SASS/Autoprefixer/Sourcemaps-map调试

后期改为集成 gulp-tasks-build 的 gulp styles 任务来编译

此项目代码目前仍可正常运行，但不再更新了，推荐转到 [gulp-tasks-build](https://www.npmjs.com/package/gulp-tasks-build)。

update: 2015-10-14.

## Get Started
`npm install && gulp sass` will build all the prefixed styles.

The `default` Gulp task will kick off a Browsersync instance for live development.

## What's in the Box?
### SASS
SMACSS & BEM living in harmony. Includes a responsive grid that you're welcome to
chuck or replace with your own grid.

### Autoprefixer
It's the 21st century; don't fumble around with vendor prefixes. Let [Autoprefixer](https://github.com/postcss/autoprefixer) and [caniuse.com](http://www.caniuse.com) do the grunt work. Indicate which browsers
you'd like to support—down to specific versions, or only browsers above a certain
percentage of global browser share—and the right prefixes will be postprocessed
into your styles.

### Sourcemaps
Tack on SASS sourcemaps to get straight to the point when debugging.

### Browsersync
Because if you're developing on the web, you really need to be using Browsersync.
