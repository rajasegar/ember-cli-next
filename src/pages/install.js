'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');
const fs = require('fs');
const listStyle = require('../styles/list');
const Terminal = require('../widgets/terminal');
const addMenuBar = require('../widgets/menuBar');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const root = process.cwd();
  const packageManifest = JSON.parse(
    fs.readFileSync(`${root}/package.json`, 'utf-8')
  );

  const devDepsList = grid.set(0, 0, 6, 2, blessed.list, {
    parent: screen,
    label: 'Dev Dependencies',
    keys: true,
    vi: true,
    style: listStyle,
  });

  devDepsList.setItems(Object.keys(packageManifest.devDependencies));

  devDepsList.key(['tab'], () => {
    depsList.focus();
  });

  const depsList = grid.set(6, 0, 5, 2, blessed.list, {
    parent: screen,
    label: 'Dependencies',
    keys: true,
    vi: true,
    style: listStyle,
  });

  const deps = packageManifest.dependencies
    ? Object.keys(packageManifest.dependencies)
    : [];

  depsList.setItems(deps);

  depsList.key(['tab'], () => {
    text.focus();
  });

  const form = grid.set(0, 2, 2, 10, blessed.form, {
    parent: screen,
    keys: true,
    content: 'ember install: ',
  });

  var text = blessed.textbox({
    parent: form,
    mouse: true,
    keys: true,
    fg: 'white',
    border: {
      type: 'line',
      fg: 'white',
    },
    height: 3,
    width: 80,
    left: 1,
    top: 2,
    name: 'text',
  });

  text.on('focus', function () {
    text.readInput();
  });

  text.on('blur', function () {
    devDepsList.focus();
  });

  text.key('tab', () => {
    devDepsList.focus();
  });

  text.on('submit', (data) => {
    if (data) {
      terminal.pty.write(`ember install ${data}\r`);
      text.clearValue();
    }
  });

  const terminal = grid.set(2, 2, 9, 10, Terminal, {
    parent: screen,
    label: 'Log',
    fullUnicode: true,
  });

  addMenuBar(grid, screen);

  text.focus();
  screen.render();
};
