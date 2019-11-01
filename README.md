<h1 align="center">
    :loudspeaker: Gadget Catalog
</h1>

<h4 align="center">A single page application for cataloging gadgets. Built with react, express, mongodb and much more.</h4>

<div align="center">
    <a href="https://travis-ci.org/shibbir/gadget-catalog">
        <img src="https://travis-ci.org/shibbir/gadget-catalog.svg?branch=master" alt="Build Status"/>
    </a>
    <a href="https://coveralls.io/github/shibbir/gadget-catalog?branch=master">
        <img src="https://coveralls.io/repos/github/shibbir/gadget-catalog/badge.svg?branch=master" alt="Coverage Status"/>
    </a>
    <a href="https://david-dm.org/shibbir/gadget-catalog">
        <img src="https://david-dm.org/shibbir/gadget-catalog.svg" alt="Dependency Status"/>
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
    </a>
</div>

<div align="center">
    <sub>Yet another <a href="https://reactjs.org/">react.js</a> application. Built with ❤︎ by
    <a href="https://twitter.com/shibbir_io">Shibbir Ahmed</a> and
    <a href="https://github.com/shibbir/gadget-catalog/graphs/contributors">
        contributors.
    </a>
</div>

## Table of Contents
- [Built with](#built-with)
- [Configuring Cloudinary](#configuring-cloudinary)
- [Configuring environment variables](#configuring-environment-variables)
- [Installation and bootstrapping](#installation-and-bootstrapping)
- [Running tests](#running-tests)
- [Demo](#demo)
- [Bug or Feature Request](#bug-or-feature-request)
- [License](#license)

## :hammer: Built with

- [Cloudinary](https://cloudinary.com/)
- [Draft.js](https://draftjs.org/)
- [Express](https://expressjs.com/)
- [Formik](https://jaredpalmer.com/formik/)
- [Highcharts](https://www.highcharts.com/)
- [Mocha](https://mochajs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/)
- [Passport](http://passportjs.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Semantic-UI-React](https://react.semantic-ui.com/)
- [Webpack](https://webpack.js.org/)

## :cloud: Configuring Cloudinary

This application requires [Cloudinary](https://cloudinary.com/), which is a Software-as-a-Service (SaaS) solution for managing media assets in the cloud. Just signup for a free account. After signing up you will find your configuration parameters in cloudinary management [console.](https://cloudinary.com/console)

## :key: Configuring environment variables

> Rename .env.example file to .env and adjust your environment variables. Details for each environment variables are below:
 
Name | Default value | Description
------------ | ------------- | -------------
**PORT** | `4040` | On which port express server will be running to
**BASE_URL** | - | Applications base or root url. For example, if you didn't specify a port via `PORT` environment variable then your base url would be *http://localhost:4040*
**MONGODB_URI** | mongodb://localhost/gadget-catalog | MongoDB connection string URI. For more details visit [here](https://docs.mongodb.com/manual/reference/connection-string/).
**TOKEN_SECRET** | - | JWT secret key. Learn more from [here](https://jwt.io/introduction/).
**GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET** | - | These are you OAuth 2.0 client credentials from google which you will need to configure OAuth 2.0. Learn more from [here](https://developers.google.com/identity/protocols/OAuth2).
**FACEBOOK_CLIENT_ID** and **FACEBOOK_CLIENT_SECRET** | - | These are you OAuth 2.0 client credentials from facebook which you will need to configure OAuth 2.0. Learn more from [here](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow).
**CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY**, and **CLOUDINARY_API_SECRET** | - | After signing up for a free account in [Cloudinary](https://cloudinary.com/), go to your [dashboard](https://cloudinary.com/console) to obtain the required credentials to access their api. Learn more from [here](https://cloudinary.com/documentation).
**SMTP_HOST**, **MAILER_ADDRESS**, and **MAILER_PASSWORD** | - | Your mail server's smtp address and your email credentials. Learn more from [here](https://nodemailer.com/smtp/). If you want to use gmail to send emails you have to allow non secure apps to access gmail. you can do this by going to your gmail settings [here](https://myaccount.google.com/lesssecureapps).

## :rocket: Installation and bootstrapping

> You need to have [Node.js](https://nodejs.org/en/) and optionally [Yarn](https://yarnpkg.com/lang/en/) installed on your machine before running the followings:

```bash
$ cd /path/to/root
$ yarn install
## or,
$ npm install

## development build
$ npm start

## production build
$ npm run production
```

## :heavy_check_mark: Running Tests

```bash
$ cd /path/to/root

## run unit tests
$ npm test

## generate coverage report
$ npm run coverage
```

## :flashlight: Demo
Here is a working live demo :  https://gadget-catalog-io.herokuapp.com/

## :beetle: Bug or Feature Request

If you find a bug, kindly open an issue [here](https://github.com/shibbir/gadget-catalog/issues/new) by including your step by step to reproduce the issue.

If you'd like to request a new feature, feel free to do so by opening an issue [here](https://github.com/shibbir/gadget-catalog/issues/new).

## :memo: License
<a href="https://opensource.org/licenses/MIT">The MIT License</a> Copyright &copy; 2020 Shibbir Ahmed
