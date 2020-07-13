# React-Express Template

### A Starting Point For A Modern Website

## About Project

This template repository is a great starting point for a fresh modern website. Utilizing npm, webpack, and Express, the 
site is ready for both development and production.

The site comes bundled with the following technology.

### Client

The site utilizes the newest React syntax for the base code. Use `client/components/Layout.js` as a starting point for 
your site. App.js has built in error handling, call the method `props.produceSnackbar` from anywhere in `Layout.js`.

Styles can be used inline or within the SCSS file found under `client/static/styles/global.scss`. The file is imported 
in `client/index.js`, if you wish to add more SCSS files, simply import them there.

Replace elements of `client/static/templates/` with files to your liking. Image imports can be done directly, webpack 
will handle the loading.

The site is bundled with several React packages for a quick development start. Material-UI is packaged for a styled 
component library, and framer-motion is included if animations are required.

### Server

The server is a simple Express server. When booted, it will search along the server file path for certificate files. If
found, it will boot the server in HTTPS mode, otherwise in traditional HTTP mode. The site uses morgan for logging.

## Quick Start

First, download the required npm packages.

```bash
npm install
```

Then, run the appropriate command for your purposes.

```bash
npm run [dev / prod]
```

### Serverless Start

If you do not need the server, run the script provided.

```bash
./removeServer.sh
```

Then in package.json, use the following for scripts:

```json
{
    "dev": "webpack-dev-server -d",
    "prod": "webpack -p"
}
```
