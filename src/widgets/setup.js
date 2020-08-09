const contrib = require('blessed-contrib');
const blessed = require('neo-blessed');
const fs = require('fs');

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

  const style = {
    fg: 'yellow',
    focus: {
      border: {
        fg: 'white',
      },
    },
    selected: {
      bg: 'blue',
    },
  };

  const projDetails = [];

  const emberCliVersion =
    packageManifest.devDependencies['ember-cli'] ||
    packageManifest.dependencies['ember-cli'] ||
    '';

  projDetails.push(['version', packageManifest.version]);
  projDetails.push(['private', packageManifest.private]);
  projDetails.push(['LICENSE', packageManifest.license]);
  projDetails.push(['ember-cli', emberCliVersion]);
  projDetails.push(['Ember edition', packageManifest.ember.edition || '']);
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
    label: packageManifest.name,
    selectedBg: 'black',
    columnWidth: [15, 50],
    columnSpacing: 3,
  });

  //set default table
  projWidget.setData({ headers: ['', ''], data: projDetails });

  const taskListWidget = grid.set(4, 0, 4, 6, blessed.list, {
    parent: screen,
    label: 'Tasks',
    keys: true,
    vi: true,
    style,
  });

  const tasks = Object.keys(packageManifest.scripts);

  taskListWidget.setItems(tasks);

  taskListWidget.on('select', function (node) {
    const { content } = node;
    terminal.pty.write(`npm run ${content}\r`);
  });

  const memoryWidget = grid.set(8, 0, 4, 3, contrib.line, {
    label: 'Memory Usage in KB',
    style: { line: 'yellow', text: 'green', baseline: 'black' },
    xLabelPadding: 3,
    xPadding: 5,
    showLegend: true,
    wholeNumbersOnly: false, //true=do not show fraction in y axis
  });

  const cpuWidget = grid.set(8, 3, 4, 3, contrib.line, {
    label: 'CPU Usage',
    style: { line: 'yellow', text: 'green', baseline: 'black' },
    xLabelPadding: 3,
    xPadding: 5,
    showLegend: true,
    wholeNumbersOnly: false, //true=do not show fraction in y axis
  });

  const terminal = grid.set(0, 6, 12, 6, blessed.terminal, {
    parent: screen,
    label: 'Log',
    fullUnicode: true,
  });

  return {
    grid,
    memoryWidget,
    cpuWidget,
    projWidget,
    terminal,
    taskListWidget,
  };
};
