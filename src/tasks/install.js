const execa = require('execa');

module.exports = function (screen, root, logWidget, addonName) {
  logWidget.log(`Started running ember install ${addonName} ...`);
  try {
    let subProcess = execa('ember', ['install', addonName], { cwd: root });

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
      logWidget.log('Addon installed.');
      screen.render();
    });

    stdout.on('error', (data) => {
      //console.log(data);
      logWidget.log(data);
      screen.render();
    });

    return subProcess;
  } catch ({ stderr, exitCode }) {
    //console.log(stderr);
    logWidget.log(stderr);
    screen.render();
  }
};
