// 引用 gulp plugin
var gulp = require('gulp'),             // 載入 gulp
gulpUglify = require('gulp-uglify'),    // 載入 gulp-uglify
gulpSass = require('gulp-sass'),      // 載入 gulp-sass
gulpCompass  = require('gulp-compass'),  //載入 compass
 gulpPlumber = require('gulp-plumber'); // 載入 gulp-plumber

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['script']);
    gulp.watch('src/scss/*.scss', ['styles-scss']);
});


gulp.task('script',function(){
    gulp.src("src/*.js")   // 指定要處理的原始 src 檔案目錄
    .pipe(gulpUglify())      // 將 JavaScript 做最小化
    .pipe(gulp.dest('src/min'));   // 指定最小化後的 src 檔案目錄
});

gulp.task('styles-scss', function () {
    gulp.src('src/scss/*.scss')                      // 指定要處理的 Scss 檔案目錄
        .pipe(gulpPlumber())                    // 使用 gulp-plumber 處理例外
        .pipe(gulpSass({                            // 編譯 Scss 並壓縮
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('src/css'));                    // 指定編譯後的 css 檔案目錄
});

//需安裝ruby
gulp.task('styles-compass', function () {
    gulp.src('src/*.sass') // sass 來源路徑
        .pipe(gulpCompass({
            css: 'src/assets/',           // compass 輸出位置
            sass: 'src/scss/',      // sass 來源路徑
            //image: 'src/assets/images',   // 圖片來源路徑
            style: 'compressed',                // CSS 處理方式，預設 nested（expanded, nested, compact, compressed）
            comments: false,                    // 是否要註解，預設(true)
            require: ['susy'],                  // 額外套件 susy
        }));
        // .pipe(gulp.dest('app/assets/temp')); // 輸出位置(非必要)
});


// 建立預設 gulp task
gulp.task('default', ['script','watch','styles-scss']);
