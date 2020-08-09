const homePage = require('../pages/home');
const lintPage = require('../pages/lint');
const testPage = require('../pages/test');
const generatePage = require('../pages/generate');
const destroyPage = require('../pages/destroy');

const pages = [
  { name: 'home', page: homePage, keyCodes: ['0'] },
  { name: 'lint', page: lintPage, keyCodes: ['1'] },
  { name: 'test', page: testPage, keyCodes: ['2'] },
  { name: 'generate', page: generatePage, keyCodes: ['3'] },
  { name: 'destroy', page: destroyPage, keyCodes: ['4'] },
];

module.exports = pages;
