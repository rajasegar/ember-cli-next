'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  grid.set(0, 0, 6, 12, blessed.bigtext, {
    parent: screen,
    content: 'ember-cli-next',
    width: '80%',
    height: 'shrink',
    border: 'line',
    fch: ' ',
    style: {
      fg: 'white',
      //bg: 'blue',
      bold: true,
    },
  });

  const credits = `
  Thanks to this awesome libraries/projects without which ember-cli-next wouldn't be possible.
  - blessed by Christopher Jeffrey - github.com/chjj/blessed
  - blessed-contrib by Yaron Naveh - github.com/yaronn/blessed-contrib
  - node-pty - github.com/microsoft/node-pty
  - term.js by Christopher Jeffrey - github.com/chjj/term.js

  This project is inspired by other awesome tools built with blessed like:
  - https://github.com/golbin/git-commander
  - https://github.com/lirantal/dockly
  `;

  grid.set(6, 0, 6, 12, blessed.box, {
    content: credits,
  });

  screen.render();
};
