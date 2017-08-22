module.exports = function (grunt) {
    grunt.initConfig({
        protractor: {
            options: {
                configFile: 'conf.js', // Default config file 
                keepAlive: true, // If false, the grunt process stops when the test fails. 
                noColor: false, // If true, protractor will not use colors in its output. 
                args: { // Arguments passed to the command
                }
            },
            chrome: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
                options: {
                    configFile: './config/chrome.js', // Target-specific config file 
                    args: { // Target-specific arguments

                    }
                }
            },
        },
        shell: {
            options: {
                stdout: false,
                stderr: false,
                failOnError: false
            },
            wdUpdateStandalone: {
                command: 'webdriver-manager update --standalone',
                options: {
                    execOptions: {
                        cwd: __dirname + '/node_modules/.bin'
                    }
                }
            },
            wdUpdateChrome: {
                command: 'webdriver-manager update --chrome',
                options: {
                    execOptions: {
                        cwd: __dirname + '/node_modules/.bin'
                    }
                }
            },
            wdUpdateIe32: {
                command: 'webdriver-manager update --ie32',
                options: {
                    execOptions: {
                        cwd: __dirname + '/node_modules/.bin'
                    }
                }
            },
            wdStart: {
                command: 'start /B webdriver-manager start',
                options: {
                    async: true,
                    execOptions: {
                        cwd: __dirname + '/node_modules/.bin'
                    }
                }
            },
            wdKill: {
                command: 'FOR /F "tokens=5 delims= " %P IN (\'netstat -a -n -o ^| findstr 0.0.0.0:4444\') DO TaskKill.exe /PID %P /F'
            },
            chromeDriverKill: {
                command: 'taskkill /IM chromedriver* /F /FI "memusage gt 2"'
            },
            chromeBrowserKill: {
                command: 'taskkill /IM chrome.exe  /F /FI "memusage gt 2"'
            },
            ieDriverKill: {
                command: 'taskkill /IM iedriverserver* /F /FI "memusage gt 2"'
            },
            ieBrowserKill: {
                command: 'taskkill /IM iexplore.exe  /F /FI "memusage gt 2"'
            }
        },
        jshint: {
            options: {
                esversion: 6
            },
            all: ['src/**/*.js', 'tests/**/*.js']
        },
        jsbeautifier: {
            all: {
                src: ['src/**/*.js', 'tests/**/*.js']
            }
        }
    });

    // Load grunt extensions
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    // Register grunt tasks
    grunt.registerTask('wdUpdate', ['shell:wdUpdateStandalone', 'shell:wdUpdateChrome', 'shell:wdUpdateIe32']);
    grunt.registerTask('wdStop', ['shell:wdKill']);
    grunt.registerTask('wdStart', ['wdStop', 'shell:wdStart']);
    grunt.registerTask('killDrivers', ['shell:chromeDriverKill', 'shell:ieDriverKill']);
    grunt.registerTask('killBrowsers', ['shell:chromeBrowserKill', 'shell:ieBrowserKill']);
    grunt.registerTask('chrome', ['protractor:chrome']);
    grunt.registerTask('hint', ['jshint:all']);
    grunt.registerTask('beautify', ['jsbeautifier:all']);

    grunt.registerTask('test', ['wdStart', 'chrome', 'wdStop']);
}