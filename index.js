'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const execa = require('execa');
const path = require('path');

const screen = blessed.screen();

const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

const memoryWidget = grid.set(0, 0, 6, 6, blessed.box, {
  label: 'Memory Usage',
});
const cpuWidget = grid.set(6, 0, 6, 6, blessed.box, { label: 'CPU Usage' });
const logWidget = grid.set(0, 6, 12, 6, contrib.log, { label: 'Log' });

const _root = process.argv[2] || '.';
const root = path.resolve(_root);

let subProcess;

screen.key(['escape', 'q', 'C-c'], function (/*ch, key*/) {
    return process.exit(0); // eslint-disable-line
});

screen.key(['s'], function () {
  logWidget.log('Starting Ember Server...');
  try {
    subProcess = execa('npm', ['start'], { cwd: root });

    subProcess.stdout.on('data', (data) => {
      const string = data.toString();
      logWidget.log(string);
      screen.render();
    });
  } catch ({ stderr, exitCode }) {
    logWidget.log(stderr);
  }
});

screen.key(['x'], function (/*ch, key*/) {
  subProcess.kill('SIGTERM', { forceKillAfterTimeout: 2000 });
  logWidget.log('process killed');
});

module.exports = screen;
