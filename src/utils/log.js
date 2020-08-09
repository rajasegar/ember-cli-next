const fs = require('fs');

module.exports = function (str) {
  fs.appendFile('ember-cli-next.log', str + '\n', function (err) {
    if (err) throw err;
    //console.log('Saved!');
  });
};
