const Application = require('spectron').Application;
const path = require('path');
const assert = require('assert');


let electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
const appPath = path.join(__dirname, '..');

if (process.platform === 'win32') {
  electronPath += '.cmd';
}



describe('application launch', () => {
  beforeEach(() => {
    this.app = new Application({
      path: electronPath,
      args: [appPath],
    });
    return this.app.start();
  });
  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('shows an initial window', () => this.app.client.getWindowCount().then((count) => {
    assert.equal(count, 1);
  }));


  it('check window title', () => this.app.client.getTitle().then((title) => {
    assert.equal(title, '');
  }));
});
