module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            files: ['./lib/**/*.js', './test/*.spec.js']
        },

         mochaTest: {
            files: ['./test/**/*.spec.js']
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['lint', 'test']);
}