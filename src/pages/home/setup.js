const blessed = require('blessed');
const contrib = require('blessed-contrib');
const Terminal = require('../../widgets/terminal');
const fs = require('fs');
const listStyle = require('../../styles/list');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const root = process.cwd();
  const packageManifest = JSON.parse(
    fs.readFileSync(`${root}/package.json`, 'utf-8')
  );

  let gitRepo = '';
  if (packageManifest.repository) {
    gitRepo =
      typeof packageManifest.repository === 'string'
        ? packageManifest.repository
        : packageManifest.repository.url;
  }

  let pacman = 'npm';
  if (fs.existsSync(`${root}/yarn.lock`)) pacman = 'yarn';
  if (fs.existsSync(`${root}/pnpm-lock.yaml`)) pacman = 'pnpm';

  const projDetails = [];

  const emberCliVersion =
    packageManifest.devDependencies['ember-cli'] ||
    packageManifest.dependencies['ember-cli'] ||
    '';

  projDetails.push(['version', packageManifest.version]);
  projDetails.push(['private', packageManifest.private]);
  projDetails.push(['LICENSE', packageManifest.license]);
  projDetails.push(['ember-cli', emberCliVersion]);
  projDetails.push([
    'Ember edition',
    (packageManifest.ember && packageManifest.ember.edition) || '',
  ]);
  projDetails.push([
    'devDependencies',
    Object.keys(packageManifest.devDependencies).length,
  ]);
  projDetails.push([
    'dependencies',
    (packageManifest.dependencies &&
      Object.keys(packageManifest.dependencies).length) ||
      0,
  ]);
  projDetails.push(['node version', packageManifest.engines.node || '']);
  projDetails.push(['Package manager', pacman]);
  projDetails.push(['Github', gitRepo]);

  const projWidget = grid.set(0, 0, 4, 6, contrib.table, {
    label: `Project Name: ${packageManifest.name}`,
    selectedBg: 'black',
    columnWidth: [15, 50],
    columnSpacing: 3,
  });

  //set default table
  projWidget.setData({ headers: ['', ''], data: projDetails });

  const taskListWidget = grid.set(4, 0, 4, 6, blessed.list, {
    parent: screen,
    label: 'Project Tasks',
    keys: true,
    vi: true,
    style: listStyle,
  });

  const tasks = Object.keys(packageManifest.scripts);

  taskListWidget.setItems(tasks);

  taskListWidget.on('select', function (node) {
    const { content } = node;
    terminal.pty.write(`npm run ${content}\r`);
  });

  const intro = `
    ember-cli-next is a next-generation cli for Ember.js where you can run 
    your ember-cli commands and project tasks within one single unified terminal window.
    Use your ←/→ arrows to navigate to different pages.
    Use ? to know more about keyboard shortcuts.
    You can also use the menu bar at the bottom of the screen to run different tasks.
    More info at https://github.com/rajasegar/ember-cli-next
    `;

  grid.set(8, 0, 3, 6, blessed.box, {
    parent: screen,
    label: 'About ember-cli-next',
    content: intro,
    style: {
      fg: 'yellow',
    },
  });

  const terminal = grid.set(0, 6, 11, 6, Terminal, {
    parent: screen,
    label: 'Log',
    fullUnicode: true,
    screenKeys: false,
  });

  const auto = true;
  const bar = grid.set(11, 0, 1, 12, blessed.listbar, {
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
      serve: {
        keys: ['s'],
        callback: function () {
          screen.render();
        },
      },
      stop: {
        keys: ['x'],
        callback: function () {
          screen.render();
        },
      },
      build: {
        keys: ['b'],
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

  return {
    grid,
    projWidget,
    terminal,
    taskListWidget,
    bar,
  };
};
