'use strict';

const contrib = require('blessed-contrib');
const pageList = require('../utils/pages');
const capitalize = require('../utils/capitalize');
const addMenuBar = require('../widgets/menuBar');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const helpWidget = grid.set(0, 0, 11, 12, contrib.table, {
    label: 'Help: Keyboard Navigation',
    keys: true,
    vi: true,
    style: { fg: 'yellow' },
    columnWidth: [40, 40],
  });

  addMenuBar(grid, screen);

  const helpKeys = [
    ['Next Page', 'Right Arrow'],
    ['Prev Page', 'Left Arrow'],
    ['Up', 'Up Arrow / k'],
    ['Down', 'Down Arrow / j'],
    ['Select', 'Enter / l'],
    ['Quit', 'Ctrl-q'],
    ['Install an addon', 'i'],
    ['Clear the terminal log', 'c'],
    ['Build project', 'b'],
    ['Go to the beginning of any list', 'gg'],
    ['Go to the end of any list', 'G'],
    ['Help', '? / !'],
    ['Navigate within a page', 'Tab'],
  ];

  // Generating keycodes from page objects
  pageList.forEach((p) => {
    const helpText = `Go to ${capitalize(p.name)}`;
    helpKeys.push([helpText, p.keyCodes.join(' / ')]);
  });

  helpWidget.setData({ headers: ['Function', 'Key'], data: helpKeys });
  helpWidget.focus();

  screen.render();
};
