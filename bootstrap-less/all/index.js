
var util = require('util')
  , path = require('path')
  , yeoman = require('yeoman');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.directory('.','.');
};

/**
 * Install frontend components via yeoman/bower
 */

Generator.prototype.installComponents = function installComponents() {
  var spawn = require('child_process').spawn
    , child
    , cb;

  cb = this.async();

  console.log('Finished generating bootstrap-less scaffold.');
  console.log('Installing latest jQuery, Bootstrap, Backbone, Require.js, and require-jade...');

  child = spawn('yeoman', ['install', 'jquery', 'bootstrap', 'backbone', 'requirejs', 'require-jade', '--save']);

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  child.stderr.on('data', function(data) {
    console.log('Error:', data.toString());
  });

  child.on('exit', function(code) {
    console.log('Latest components successfully installed.');
    cb();
  });

};

/**
 * Install packages via npm
 */

Generator.prototype.installPackages = function installPackages() {
  var spawn = require('child_process').spawn
    , child
    , cb;

  cb = this.async();

  console.log('Installing grunt-recess...');

  child = spawn('npm', ['install', 'grunt-recess', '--save-dev']);

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  child.stderr.on('data', function(data) {
    console.log('Error:', data.toString());
  });

  child.on('exit', function(code) {
    console.log('grunt-recess successfully installed.');
    cb();
  });

};
