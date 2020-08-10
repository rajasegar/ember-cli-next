'use strict';

const blessed = require('blessed');
const pty = require('node-pty');
const os = require('os');

const setupWidgets = require('./setup');

module.exports = function (screen) {
  const { taskListWidget, terminal } = setupWidgets(screen);

  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

  let ptyProcess = null;

  const installPrompt = blessed.prompt({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
  });

  taskListWidget.key(['s'], function () {
    ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.cwd(),
      env: process.env,
    });
    ptyProcess.onData((data) => terminal.write(data));
    ptyProcess.write('npm start\r');
  });

  taskListWidget.key(['x'], function (/*ch, key*/) {
    //clearInterval(interval);
    ptyProcess.kill();
    terminal.write('Server stopped\n');
    terminal.pty.write('\r');
  });

  taskListWidget.key(['tab'], function () {
    terminal.focus();
  });

  terminal.key(['tab'], function () {
    taskListWidget.focus();
  });

  screen.key(['c'], function () {
    terminal.pty.write('clear\r');
  });

  screen.key(['b'], function () {
    terminal.pty.write('npm run build\r');
  });

  screen.key(['h'], function () {
    terminal.pty.write('ember help\r');
  });

  screen.key(['v'], function () {
    terminal.pty.write('ember version --verbose\r\n');
  });

  screen.key(['i'], function () {
    installPrompt.input('ember install:', '', function (err, value) {
      if (err) return;
      if (value) {
        terminal.pty.write(`ember install ${value}\r`);
      } else return;
    });
  });

  screen.append(installPrompt);
  taskListWidget.focus();

  screen.render();
};
