'use strict';
const blessed = require('blessed');

module.exports = function (grid, screen) {
  const auto = true;
  grid.set(11, 0, 1, 12, blessed.listbar, {
    parent: screen,
    bottom: 0,
    left: 3,
    right: 3,
    height: auto ? 'shrink' : 3,
    mouse: true,
    keys: true,
    autoCommandKeys: true,
    border: 'line',
    vi: true,
    style: {
      item: {
        hover: {
          bg: 'blue',
        },
      },
      selected: {
        bg: 'blue',
        fg: 'white',
      },
    },
    commands: {
      home: {
        keys: ['0'],
        callback: function () {
          screen.render();
        },
      },
      install: {
        keys: ['i'],
        callback: function () {
          screen.render();
        },
      },
      lint: {
        keys: ['l'],
        callback: function () {
          screen.render();
        },
      },
      test: {
        keys: ['t'],
        callback: function () {
          screen.render();
        },
      },
      generate: {
        keys: ['g'],
        callback: function () {
          screen.render();
        },
      },
      destroy: {
        keys: ['d'],
        callback: function () {
          screen.render();
        },
      },
      help: {
        keys: ['?'],
        callback: function () {
          screen.render();
        },
      },
      credits: {
        keys: ['9'],
        callback: function () {
          screen.render();
        },
      },
      quit: {
        keys: ['C-q'],
        callback: function () {
          screen.render();
        },
      },
    },
  });
};
