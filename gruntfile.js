module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
              dev: {
                options: {
                  config: 'config.rb',
                  force: true
                }
              }
        },
        autoprefixer: {
            dist: {
                files: {
                    'build/styles.css': 'css/styles.css'
                }
            }
        },
        watch: {
          sass: {
            files: ['assets/sass/**/*.scss'],
            tasks: ['compass:dev']
          },
          /* watch and see if our javascript files change, or new packages are installed */
          styles: {
                files: ['css/styles.css'],
                tasks: ['autoprefixer']
          },
          js: {
            files: ['assets/js/main.js', 'components/**/*.js'],
            tasks: ['uglify']
          },
          /* watch our files for change, reload */
          livereload: {
            files: ['*.html', 'assets/css/*.css', 'assets/images/*', 'assets/js/{main.min.js, plugins.min.js}'],
            options: {
              livereload: true
            }
          },
        }

    });
    grunt.registerTask('default', 'watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
};