const execa = require('execa');

module.exports = function (screen, root, logWidget, addonName) {
  logWidget.log(`Started running ember generate ${addonName} ...`);
  const generateArgs = addonName.split(' ');
  const cmdArgs = ['generate'].concat(generateArgs);
  (async () => {
    try {
      let subProcess = await execa(
        'ember',
        ['g', 'component', 'raja-segar', '-gc'],
        {
          cwd: root,
          all: true,
        }
      );

      const { stdout, stderr } = subProcess;
      //console.log(stdout);
      //console.log(stderr);
      logWidget.log(stdout);
      logWidget.log(stderr);
      screen.render();
    } catch (error) {
      //console.log(error);
      logWidget.log(error.stderr);
      screen.render();
    }
  })();

  /*
    subProcess.stdout.on('data', (data) => {
      const string = data.toString();
      logWidget.log(string);
      screen.render();
    });

    subProcess.stderr.on('data', (data) => {
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
      logWidget.log('ember generate finished.');
      screen.render();
    });

    stdout.on('error', (data) => {
      //console.log(data);
      logWidget.log(data);
      screen.render();
    });
    */
};
