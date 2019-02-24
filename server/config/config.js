const _ = require('lodash');
const path = require('path');
const glob = require('glob');

let getGlobbedPaths = function (globPatterns, excludes) {
    let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            let files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (let i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], '');
                            }
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

function initGlobalConfig() {
    let defaultAssets = require(path.join(process.cwd(), 'server/config/assets/default'));
    let environmentAssets = process.env.NODE_ENV === 'production' ? require(path.join(process.cwd(), 'server/config/assets/production')) : {};

    let assets = _.merge(defaultAssets, environmentAssets);

    let config = {
        client: {
            js: getGlobbedPaths(assets.client.js, ['public/']),
            css: getGlobbedPaths(assets.client.css, ['public/'])
        },
        server: {
            models: getGlobbedPaths(assets.server.models)
        }
    };

    return config;
}

module.exports = initGlobalConfig();
