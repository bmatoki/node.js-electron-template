const path = require('path');
const jquery = require('jquery');
const jqueryui = require('jquery-ui');
const remote = require('electron').remote;
const logger = require(path.join(__dirname, './js/log.util.js'));


// minimize application function
$('.close-btn').on('click', (event) => {
  const window = remote.getCurrentWindow();
  event.preventDefault();
  window.hide();
});


// Jquery events
$(document).ready(async () => {
  logger.info('Jquery loaded, started init function');
});
