const blessed = require('blessed');
const contrib = require('blessed-contrib');
const screen = blessed.screen({ smartCSR: true, warnings: true });

const log = require('./src/utils/log');
const pages = require('./src/utils/pages');

// We deliberately omitted helpPage to avoid circular dependencies
const helpPage = require('./src/pages/help');

log('Starting ember-cli-next');

screen.key(['C-q'], function (/*ch, key*/) {
  return process.exit(0); // eslint-disable-line
});

const _pages = [
  ...pages,
  { name: 'help', page: helpPage, keyCodes: ['?', '!'] },
];
const pageObjects = _pages.map((p) => p.page);
var carousel = new contrib.carousel(pageObjects, {
  screen: screen,
  interval: 0, //how often to switch views (set 0 to never swicth automatically)
  controlKeys: true, //should right and left keyboard arrows control view rotation
});

// Define keyboard navigations
_pages.forEach((p, index) => {
  screen.key(p.keyCodes, function (/*ch, key*/) {
    carousel.currPage = index;
    carousel.move();
  });
});

module.exports = carousel;
