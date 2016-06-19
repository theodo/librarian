var netatmo = require('netatmo');

var auth = {
  'client_id': '51dfb6ed187759329100003a',
  'client_secret': 'PRBJtOkVxpGQV5QRAXA4wccqTjZ8ho84sDQgoBWzYNsO',
  'username': 'dev@theodo.fr',
  'password': 'XXXX',
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
    //step_time: 100,
    scale : 'max',
    //optimize : false,
    device_id: device._id,
    type : ['Noise']
  };

  api.getMeasure(options, function(err, measure) {
    var formatted_measures = {};
    for (var i=0; i<measure.length; i++) {
      for (var j=0; j<measure[i].value.length; j++) {
        if (measure[i].step_time) {
          var time = measure[i].beg_time + measure[i].step_time * j;
        }
        else {
          var time = measure[i].beg_time;
        }

        formatted_measures[new Date(time * 1000)] = measure[i].value[j];
      }
    }
    console.log(formatted_measures);
  });
});