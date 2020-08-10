# ember-cli-next
![Build and Deploy](https://github.com/rajasegar/ember-cli-next/workflows/Build%20and%20Deploy/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](http://img.shields.io/npm/v/ember-cli-next.svg?style=flat)](https://npmjs.org/package/ember-cli-next "View this project on npm")


Experimental Next generation TUI (terminal user interface) for ember-cli based on [blessed](https://github.com/chjj/blessed) and [blessed-contrib](https://github.com/yaronn/blessed-contrib),   where you can run your ember-cli commands and project tasks within one single unified terminal window.

## Install
```
npm install -g ember-cli-next
```

## Usage
```
ember-cli-next
```

## Demo
[ember-cli-next demo](https://www.youtube.com/watch?v=do9sRiOxenA)

## Screenshots

### Home Page
![home](screenshots/home.png)

### Install Ember addons
![ember-install](screenshots/ember-install.png)

### Run Tests
![ember-test](screenshots/ember-test.png)

### Run tests with custom filters
![custom-filter-test](screenshots/custom-filter-test.png)

### Generate Blueprints
![ember-generate](screenshots/ember-generate.png)

## Keyboard shortcuts
```
    ['Next Page', 'Right Arrow'],
    ['Prev Page', 'Left Arrow'],
    ['Up', 'Up Arrow / k'],
    ['Down', 'Down Arrow / j'],
    ['Select', 'Enter / l'],
    ['Quit', 'Ctrl-q'],
    ['Install an addon', 'i'],
    ['Clear the terminal log', 'c'],
    ['Build project', 'b'],
    ['Go to the beginning of any list', 'gg'],
    ['Go to the end of any list', 'G'],
    ['Help', '? / !'],
    ['Navigate within a page', 'Tab'],
    ['Go to Home page', '0'],
    ['Go to Lint page', 'l'],
    ['Go to Tests page', 't'],
    ['Go to Generate page', 'g'],
    ['Go to Destroy page', 'd'],
    ['Go to Credits page', '9'],
```

## FAQs

### How do I quit this thing?
You can press `Ctrl-q` to quit the program at any time.

### How can I see the keyboard shortcuts for navigating?
Press ? or ! to see the keyboard navigation shortcuts page.

### How can I quickly navigate to home page screen?
Press 0 to go to the home page.

### How do I navigate between different pages of the cli?
You can use the arrow keys to navigate between pages, Left Arrow to previous screen and Right Arrow to next screen.

### Does it support vi/vim navigation keys in the lists?
Yes. You can use j,k,gg,G,l and /

## Known issues
- Some times while navigating between different pages you might get Max Event Listeners exceeded error 
- When you have focus in a terminal window, pressing the hot keys like `l,g,d` will take you to the respective pages instead of printing chars in the terminal.
- The terminal windows cannot be paginated, which means you can't scroll up/down inside the terminal.
- The program might crash if you are not inside an Ember project.
