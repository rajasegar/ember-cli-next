'use strict';

const blessed = require('blessed');
const pty = require('node-pty');
const pidusage = require('pidusage');
const os = require('os');

const screen = blessed.screen({ smartCSR: true });

const setupWidgets = require('./src/widgets/setup');

const { memoryWidget, cpuWidget, taskListWidget, terminal } = setupWidgets(
  screen
);
const { memorySeries, cpuSeries } = require('./src/widgets/data');

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env,
});

const interval = setInterval(function () {
  pidusage(ptyProcess.pid, function (err, stats) {
    const _memorySeries = Object.assign({}, memorySeries);
    _memorySeries.x.push(stats.timestamp);
    _memorySeries.y.push(Math.round(stats.memory / 1024)); // Memory usage in KB
    memoryWidget.setData([_memorySeries]);

    const _cpuSeries = Object.assign({}, cpuSeries);
    _cpuSeries.x.push(stats.timestamp);
    _cpuSeries.y.push(stats.cpu);
    cpuWidget.setData([_cpuSeries]);
    screen.render();
  });
}, 1000);

const installPrompt = blessed.prompt({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 'shrink',
  width: 'shrink',
  border: 'line',
});

terminal.pty.write(`cd ${process.cwd()}\r`);
terminal.pty.write(`clear\r`);

screen.key(['escape', 'q', 'C-c'], function (/*ch, key*/) {
  return process.exit(0); // eslint-disable-line
});

screen.key(['s'], function () {
  ptyProcess.onData((data) => terminal.write(data));
  ptyProcess.write('npm start\r');
});

screen.key(['x'], function (/*ch, key*/) {
  clearInterval(interval);
  ptyProcess.kill();
  terminal.write('Server stopped');
  terminal.pty.write('clear\r');
});

screen.key(['l'], function (/*ch, key*/) {
  terminal.pty.write('npm run lint\r');
});

screen.key(['t'], function (/*ch, key*/) {
  terminal.pty.write('npm test\r');
});

screen.key(['c'], function () {
  terminal.pty.write('clear\r');
});

screen.key(['b'], function () {
  terminal.pty.write('npm run build\r');
});

screen.key(['i'], function () {
  installPrompt.input('ember install:', '', function (err, value) {
    if (err) return;
    if (value) {
      terminal.pty.write(`ember install ${value}\r`);
    } else return;
  });
});

screen.key(['g'], function () {
  installPrompt.input('ember generate:', '', function (err, value) {
    if (err) return;
    if (value) {
      terminal.pty.write(`ember generate ${value}\r`);
    } else return;
  });
});

screen.append(installPrompt);
taskListWidget.focus();

module.exports = screen;
