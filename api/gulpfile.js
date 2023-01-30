import gulp from 'gulp'
import gulpLess from 'gulp-less'
import less from 'less'
import image from 'gulp-image'
import { deleteAsync } from "del"
import {create} from 'browser-sync'
import path from "path"
import webpack from 'webpack-stream'
import foreach from 'gulp-foreach'


const __dirname = path.resolve();

const paths = {
    srcFolfder: path.join(__dirname, 'src'),
    scriptsFolder: path.join(__dirname, 'src/scripts'),
    imagesFolder: path.join(__dirname, 'src/images'),
    pugFolder: path.join(__dirname, 'views/*.pug'),
    lessFolder: path.join(__dirname, 'src/styles'),
    dist: path.join(__dirname, 'dist/gulp')
}

const sciptFiles = [`${paths.scriptsFolder}/users.js`];
const lessFiles = [`${paths.lessFolder}/style.less`];

const browserSync = create();
const lessgulp = gulpLess(less)

const pugTask = () => {
    return gulp.src(paths.pugFolder)
        .pipe(gulp.dest(paths.dist + '/view'))
}

const lessTask = () => {
    return gulp.src(lessFiles)
        .pipe(lessgulp)
        .pipe(gulp.dest(paths.dist + '/src/styles'))
}

const jsTask = () => {
    return gulp.src(sciptFiles, { sourcemaps: true })
        .pipe(foreach(function (stream, file){
            let filename = path.basename(file.path, '.js')
            return stream
                .pipe(webpack(
                    {
                        output: {
                            filename: `${filename}.js`,
                        },
                        module: {
                            rules: [
                                {
                                    test: /\.(js|jsx)$/i,
                                    exclude: /node_modules/,
                                    use: {
                                        loader: "babel-loader",
                                        options: {
                                            presets: ['@babel/preset-env'],
                                        }
                                    },
                                },
                            ]
                        },
                        mode: 'development'
                    }
                ))
        }))
        .pipe(gulp.dest(paths.dist + '/src/scripts'));
}


const imagesTask = () => {
    return gulp.src(`${paths.imagesFolder}/*`)
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true 
        }))
        .pipe(gulp.dest(paths.dist + '/src/images'));
}

const resetTask = () => {
    return deleteAsync(['./dist/gulp/*']);
}

const mainTasks = gulp.parallel(lessTask, jsTask, pugTask);

const build = gulp.series(resetTask, imagesTask, mainTasks);

export default build;