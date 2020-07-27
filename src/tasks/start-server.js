const execa = require('execa');
const pidusage = require('pidusage');
const { memorySeries, cpuSeries } = require('../widgets/data');

module.exports = function (screen, root, memoryWidget, cpuWidget, logWidget) {
  try {
    logWidget.log('Starting Ember Server...');
    const subProcess = execa('npm', ['start'], { cwd: root });

    const interval = setInterval(function () {
      pidusage(subProcess.pid, function (err, stats) {
        const _memorySeries = Object.assign({}, memorySeries);
        _memorySeries.x.push(stats.timestamp);
        _memorySeries.y.push(Math.round(stats.memory / 1024)); // Memory usage in KB
        memoryWidget.setData([_memorySeries]);

        const _cpuSeries = Object.assign({}, cpuSeries);
        _cpuSeries.x.push(stats.timestamp);
        _cpuSeries.y.push(stats.cpu);
        cpuWidget.setData([_cpuSeries]);
        screen.render();
      });
    }, 1000);

    subProcess.stdout.on('data', (data) => {
      const string = data.toString();
      logWidget.log(string);
      screen.render();
    });

    return {
      interval,
      subProcess,
    };
  } catch ({ stderr, exitCode }) {
    logWidget.log(stderr);
  }
};
