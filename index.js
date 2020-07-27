'use strict';

const blessed = require('blessed');
const path = require('path');

const screen = blessed.screen();

const startServer = require('./src/tasks/start-server');
const runLint = require('./src/tasks/lint');
const runTests = require('./src/tasks/test');
const setupWidgets = require('./src/widgets/setup');

const { memoryWidget, cpuWidget, logWidget } = setupWidgets(screen);

let interval = null;

const _root = process.argv[2] || '.';
const root = path.resolve(_root);

let subProcess;

screen.key(['escape', 'q', 'C-c'], function (/*ch, key*/) {
  return process.exit(0); // eslint-disable-line
});

screen.key(['s'], function () {
  const result = startServer(screen, root, memoryWidget, cpuWidget, logWidget);
  subProcess = result.subProcess;
  interval = result.interval;
});

screen.key(['x'], function (/*ch, key*/) {
  clearInterval(interval);
  subProcess.kill('SIGTERM', { forceKillAfterTimeout: 2000 });
  logWidget.log('process killed');
  memoryWidget.setData([{ title: 'Memory', x: [], y: [] }]);
  cpuWidget.setData([{ title: 'CPU', x: [], y: [] }]);
});

screen.key(['l'], function (/*ch, key*/) {
  runLint(screen, root, logWidget);
});

screen.key(['t'], function (/*ch, key*/) {
  subProcess = runTests(screen, root, logWidget);
});

screen.key(['c'], function () {
  logWidget.log('');
});

module.exports = screen;
