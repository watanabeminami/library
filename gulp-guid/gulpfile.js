var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');//ベンダープレフィックスを自動で付けたCSSを作成できる
var webserver = require('gulp-webserver');//開発用のWebサーバーを立ち上げることができる

gulp.task('sass', function(){
    gulp.src('src/sass/style.scss')//コンパイル元を指定
        .pipe(sass({ outputStyle: 'expanded' }))//出力方式の種類
        .pipe(autoprefixer())//ベンダープレフィックスを自動で付けたCSSを作成できる
        .pipe(gulp.dest('build/css/'));//出力方式の指定
});
gulp.task('copy',function(){
	return gulp.src([
		'src/**/*.png',
		'src/**/*.html',
		// 'src/img/*.png',にするとフォルダの中にはいってくれないなぜ？
	])
	.pipe(gulp.dest('build'));
})
gulp.task('webserver', function(){
    gulp.src('build')// 公開したい静的ファイルを配置したディレクトリを指定する
        .pipe(webserver({
        host: '0.0.0.0',// localhostでもおけ
        port: 8888,
        livereload: true,//ライブリロードを有効に
        open: false // タスク実行と同時にページを開く
    }));
});
gulp.task('default', ['copy','sass','webserver']);
