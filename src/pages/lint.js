'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const listStyle = require('../styles/list');
const Terminal = require('../widgets/terminal');
const addMenuBar = require('../widgets/menuBar');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const commands = {
    ALL: 'npm run lint',
    JS: 'npm run lint:js',
    HBS: 'npm run lint:hbs',
    StyleLint: 'npm run stylelint',
  };

  const leftCol = grid.set(0, 0, 11, 2, blessed.list, {
    parent: screen,
    label: 'Lint',
    keys: true,
    vi: true,
    style: listStyle,
  });
  leftCol.setItems(Object.keys(commands));

  const terminal = grid.set(0, 2, 11, 10, Terminal, {
    parent: screen,
    label: 'Log',
    fullUnicode: true,
  });

  addMenuBar(grid, screen);

  leftCol.on('select', (node) => {
    const { content } = node;
    terminal.pty.write(`${commands[content]}\r`);
  });

  leftCol.focus();
  screen.render();
};
