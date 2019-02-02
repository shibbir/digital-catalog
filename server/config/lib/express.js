const config = require('../config');
const path = require('path');
const multer = require('multer');
const express = require('express');
const hbs = require('express-hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

module.exports = function() {
    let app = express();

    app.locals.jsFiles = config.client.js;
    app.locals.cssFiles = config.client.css;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());

    app.use(compression());

    app.use(express.static(path.join(process.cwd(), 'public')));

    app.engine('html', hbs.express4({ extname: '.html' }));
    app.set('view engine', 'html');
    app.set('views', path.join(process.cwd(), 'server/core'));

    app.use(multer({
        dest: './public/uploads/',
        files: 5,
        fileSize: 1000000
    }).array('files'));

    app.set('port', process.env.PORT || 4040);

    app.enable('trust proxy');

    return app;
};
