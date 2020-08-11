'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const addMenuBar = require('../widgets/menuBar');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
  const pkginfo = require('../../package.json');

  grid.set(0, 0, 3, 12, blessed.bigtext, {
    parent: screen,
    content: 'ember-cli-next ' + pkginfo.version,
    width: '80%',
    height: 'shrink',
    border: 'line',
    fch: ' ',
    style: {
      fg: 'white',
      bold: true,
    },
  });

  const lcd = grid.set(3, 0, 3, 12, contrib.lcd, {
    segmentWidth: 0.05, // how wide are the segments in % so 50% = 0.5
    segmentInterval: 0.11, // spacing between the segments in % so 50% = 0.550% = 0.5
    strokeWidth: 0.11, // spacing between the segments in % so 50% = 0.5
    elementSpacing: 4, // spacing between each element
    elementPadding: 2,
    elements: 14,
  });

  let temp = '';
  let counter = 0;
  function randomColor() {
    return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
  }

  setInterval(function () {
    const text = [
      'E',
      'M',
      'B',
      'E',
      'R',
      '-',
      'C',
      'L',
      'I',
      '-',
      'N',
      'E',
      'X',
      'T',
    ];

    temp = temp + text[counter++];
    if (counter > 14) {
      counter = 0;
      temp = '';
    }
    lcd.setDisplay(temp);
    lcd.setOptions({
      color: randomColor(),
    });
    screen.render();
  }, 1000);

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

  grid.set(6, 0, 5, 12, blessed.box, {
    content: credits,
    label: 'Credits',
  });

  addMenuBar(grid, screen);

  screen.render();
};
