var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getSoundLevel( function(err, sounddata) {
      if (err) throw err;
      console.log(sounddata);
      if (sounddata > 0.1) {
        console.log(sounddata.toFixed(8));
      }
    });
  }, 100); // The readings will happen every .5 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});
