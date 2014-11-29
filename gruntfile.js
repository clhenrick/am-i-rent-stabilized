module.exports = function (grunt) {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'build/styles.css': 'public/css/styles.css'
                }
            }
        },
        watch: {
            styles: {
                files: ['public/css/styles.css'],
                tasks: ['autoprefixer']
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
};