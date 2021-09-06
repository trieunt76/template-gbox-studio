module.exports = (grunt) => {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dirs: {
            public: "public",
            src: "src",
            css: "css",
            scss: "scss",
            js: "js",
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
            },
            my_target: {
                files: [
                    {
                        "<%= dirs.public %>/<%= dirs.css %>/libs.min.css": [
                            "<%= dirs.src %>/<%= dirs.css %>/**/*.css",
                        ],
                    },
                ],
            },
        },
        uglify: {
            my_target: {
                files: {
                    "<%= dirs.public %>/<%= dirs.js %>/libs.min.js": [
                        "<%= dirs.src %>/<%= dirs.js %>/libs/*.js",
                    ],
                    "<%= dirs.public %>/<%= dirs.js %>/main.min.js": [
                        "<%= dirs.src %>/<%= dirs.js %>/main.js",
                    ],
                },
            },
        },
        sass: {
            dist: {
                options: {
                    style: "compressed",
                    sourcemap: false,
                    // lineNumbers: true,
                },
                files: {
                    "<%= dirs.public %>/<%= dirs.css %>/style.min.css":
                        "<%= dirs.src %>/<%= dirs.scss %>/style.scss",
                },
            },
        },

        watch: {
            options: {
                livereload: true,
                spawn: false,
            },
            uglify: {
                files: ["<%= dirs.src %>/<%= dirs.js %>/**/*.js"],
                tasks: ["uglify"],
            },
            cssmin: {
                files: "<%= dirs.src %>/<%= dirs.css %>/**/*.css",
                tasks: ["cssmin"],
            },
            sass: {
                files: "<%= dirs.src %>/<%= dirs.scss %>/**/**/*.scss",
                tasks: ["sass"],
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        "<%= dirs.public %>/<%= dirs.css %>/style.min.css",
                        "<%= dirs.public %>/*.html",
                        "<%= dirs.src %>/<%= dirs.css %>/**/*.css",
                        "<%= dirs.src %>/<%= dirs.js %>/**/*.js",
                    ],
                },
                options: {
                    watchTask: true,
                    server: "./public",
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browser-sync");

    grunt.registerTask("default", ["browserSync", "watch"]);
};