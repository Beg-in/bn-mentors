# Bloomington-Normal Mentors Website


## Build
### Requirements
- [Gulp](http://gulpjs.com/)
```bash
$ npm install -g gulp
```
- [Bower](http://bower.io/)
```bash
$ npm install -g bower
```
- [Postgresql](http://www.postgresql.org/)

### Development runtime
#### Livereload server:
```bash
$ gulp server
```

- You can now visit [http://localhost:8081/](http://localhost:8081/) to view changes live.

#### Directories
- `src/client` - clientside html, scripts, and styles
- `src/server` - serverside scripts and sql queries

#### Serverside runtime
- Uses dependency injection from [Nodep](http://nodep.org)

### Running the test suite
#### Single Run:
```bash
$ gulp test
```
#### Continuous testing when files are changed:
```bash
$ gulp autotest
```
### Generating README.md
```bash
$ gulp docs
```
### Generating CHANGELOG.md
```bash
$ gulp changelog
```
### Notes
- jshint is part of the test suite and should be kept clean
- Commits should have high test coverage
- Docs should be kept up to date
- Additions should come with documentation
- commit messages should follow [conventional format](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)


