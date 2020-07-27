const execa = require('execa');

module.exports = function (screen, root, logWidget) {
  logWidget.log('Started running npm run lint ...');
  try {
    let subProcess = execa('npm', ['run', 'lint'], { cwd: root });

    const { stdout } = subProcess;

    stdout.on('data', (data) => {
      const string = data.toString();
      logWidget.log(string);
      screen.render();
    });

    stdout.on('end', () => {
      logWidget.log('Linting done.');
      screen.render();
    });
    return subProcess;
  } catch ({ stderr, exitCode }) {
    console.log(stderr);
  }
};
