const contrib = require('blessed-contrib');

module.exports = function (screen) {
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const memoryWidget = grid.set(0, 0, 6, 6, contrib.line, {
    label: 'Memory Usage in KB',
    style: { line: 'yellow', text: 'green', baseline: 'black' },
    xLabelPadding: 3,
    xPadding: 5,
    showLegend: true,
    wholeNumbersOnly: false, //true=do not show fraction in y axis
  });

  const cpuWidget = grid.set(6, 0, 6, 6, contrib.line, {
    label: 'CPU Usage',
    style: { line: 'yellow', text: 'green', baseline: 'black' },
    xLabelPadding: 3,
    xPadding: 5,
    showLegend: true,
    wholeNumbersOnly: false, //true=do not show fraction in y axis
  });

  const logWidget = grid.set(0, 6, 12, 6, contrib.log, { label: 'Log' });

  return {
    grid,
    memoryWidget,
    cpuWidget,
    logWidget,
  };
};
