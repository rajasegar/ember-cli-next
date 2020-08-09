'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const listStyle = require('../styles/list');
const Terminal = require('../widgets/terminal');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const commands = {
    ALL: 'npm test',
    Unit: 'ember t -s -f="Unit"',
    Integration: 'ember t -s -f="Integration"',
    Acceptance: 'ember t -s -f="Acceptance"',
    'Custom Filter': '',
  };

  const leftCol = grid.set(0, 0, 12, 2, blessed.list, {
    label: 'ember test',
    keys: true,
    vi: true,
    style: listStyle,
  });

  leftCol.setItems(Object.keys(commands));

  const prompt = blessed.prompt({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
  });

  leftCol.on('select', (node) => {
    const { content } = node;
    if (content === 'Custom Filter') {
      prompt.input('Enter custom filter', '', function (err, value) {
        if (err) return;
        if (value) {
          terminal.pty.write(`ember t -s -f="${value}"\r`);
        } else return;
      });
    } else {
      terminal.pty.write(`${commands[content]}\r`);
      terminal.focus();
    }
  });

  const terminal = grid.set(0, 2, 12, 10, Terminal, {
    parent: screen,
    label: 'Log',
    fullUnicode: true,
  });

  leftCol.key(['tab'], () => {
    terminal.focus();
  });

  terminal.key(['tab'], () => {
    leftCol.focus();
  });

  leftCol.focus();
  screen.append(prompt);
  screen.render();
};
