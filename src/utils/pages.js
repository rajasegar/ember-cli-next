const homePage = require('../pages/home');
const lintPage = require('../pages/lint');
const testPage = require('../pages/test');
const generatePage = require('../pages/generate');
const destroyPage = require('../pages/destroy');

const pages = [
  { name: 'home', page: homePage, keyCodes: ['0'] },
  { name: 'lint', page: lintPage, keyCodes: ['l'] },
  { name: 'test', page: testPage, keyCodes: ['t'] },
  { name: 'generate', page: generatePage, keyCodes: ['g'] },
  { name: 'destroy', page: destroyPage, keyCodes: ['d'] },
];

module.exports = pages;
