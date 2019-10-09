# Mantis UI

[![Build Status](https://img.shields.io/travis/Netflix/mantis-ui.svg)](https://travis-ci.com/Netflix/mantis-ui)
[![OSS Lifecycle](https://img.shields.io/osslifecycle/Netflix/mantis-ui.svg)](https://github.com/Netflix/mantis-ui)
[![License](https://img.shields.io/github/license/Netflix/mantis-ui.svg)](https://www.apache.org/licenses/LICENSE-2.0)

Management UI for interacting with Mantis.

## Prerequisites
Make sure that node and yarn are installed on your system. The minimum versions for each are listed in package.json.

## Quick Start
Run the following commands (in the root directory) to get all dependencies installed and to start the server:
```
yarn
yarn serve
```

### Building

```sh
$ yarn build
```

### Testing

```sh
$ yarn test:unit
```

Console will output the app IP after the app has been built.

### Deploy to your own server
First make sure you have built the project which will output to the
dist folder. You can serve the dist folder on any web server.
See https://cli.vuejs.org/guide/deployment.html#general-guidelines
for more details.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
