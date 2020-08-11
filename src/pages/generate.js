'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const Terminal = require('../widgets/terminal');
const blueprints = require('../utils/blueprints');
const listStyle = require('../styles/list');
const addMenuBar = require('../widgets/menuBar');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const leftCol = grid.set(0, 0, 11, 2, blessed.list, {
    label: 'ember generate',
    keys: true,
    vi: true,
    style: listStyle,
  });
  leftCol.setItems(Object.keys(blueprints));

  leftCol.on('select', (node) => {
    const { content } = node;
    const blueprint = blueprints[content];
    prompt.input(`ember generate ${blueprint}:`, '', function (err, value) {
      if (err) return;
      if (value) {
        terminal.pty.write(`ember generate ${blueprint} ${value}\r`);
      } else return;
    });
  });

  const prompt = blessed.prompt({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
  });

  const terminal = grid.set(0, 2, 11, 10, Terminal, {
    parent: screen,
    label: 'Log',
    fullUnicode: true,
  });

  addMenuBar(grid, screen);

  leftCol.focus();
  screen.append(prompt);
  screen.render();
};
