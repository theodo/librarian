var netatmo = require('netatmo');

var auth = {
  'client_id': '51dfb6ed187759329100003a',
  'client_secret': '***REMOVED***',
  'username': 'dev@theodo.fr',
  'password': 'XXXXXX',
};

var api = new netatmo(auth);
var device = null;

// Get User
// See Docs: http://dev.netatmo.com/doc/restapi/getuser
api.getUser(function(err, user) {
  //console.log(user);
});

// Get Devicelist
// See docs: http://dev.netatmo.com/doc/restapi/devicelist
api.getDevicelist(function(err, devices, modules) {
  if (err) {
    console.log('Error', err);
  }
  device = devices[0];
  var date_begin =new Date((new Date().getTime() / 1000 - 24 * 3600) * 1000);
  date_begin.setHours(8);
  date_begin.setMinutes(0);
  var date_end = new Date((new Date().getTime() / 1000 - 24 * 3600) * 1000);
  date_end.setHours(21);
  date_end.setMinutes(0);

  var options =
  {
    date_begin : '' + Math.round(date_begin.getTime() / 1000, 0),
    step_time: 100,
    scale : 'max',
    optimize : 'false',
    device_id: device._id,
    type : ['Noise']
  };
  api.getMeasure(options, function(err, measure) {
    console.log(measure.length);
    console.log(measure[0]);
  });
});
