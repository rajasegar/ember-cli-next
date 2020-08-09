const execa = require('execa');

module.exports = function (screen, root, logWidget) {
  logWidget.log('Started running ember build -prod ...');
  try {
    let subProcess = execa('npm', ['run', 'build'], { cwd: root });

    const { stdout } = subProcess;

    subProcess.stdout.on('data', (data) => {
      const string = data.toString();
      logWidget.log(string);
      screen.render();
    });

    stdout.on('close', (data) => {
      const string = data.toString();
      logWidget.log(string);
      screen.render();
    });

    stdout.on('end', () => {
      logWidget.log('Build Finished');
      screen.render();
    });

    stdout.on('error', (data) => {
      //console.log(data);
    });

    return subProcess;
  } catch ({ stderr, exitCode }) {
    console.log(stderr);
  }
};
