module.exports = function(app){

var User = require('../db/models/user-model');
var lat, longi;
var destination = '25.3120502,55.4927023';
var origin;
var str; //connection string to Google Distance Matrix
var check = false; //check if new updates
app.post('/post',function(req,res){
  console.log('Getting post from Bus and checking if new updates...');
  if( (lat != JSON.parse(req.body.body).lat) || (longi != JSON.parse(req.body.body).longi) )
  {  
    console.log('We have new updates');
    check = true;
    lat = JSON.parse(req.body.body).lat;
    longi = JSON.parse(req.body.body).longi;
    origin = '' + lat + ',' + longi;
    console.log('lat:'+lat+' lng: '+longi);
    var str = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+'&destinations='+destination+'&mode=driving&key='+key;
    request(str,function(error,response,body){
      console.log(JSON.parse(body).rows[0].elements[0].duration.text + ' to destination');
    });
      res.header("Access-Control-Allow-Origin", "*");
      res.send('');
  }

  else
  {
    check = false;
    console.log('No new updates from bus.');
  }
  
})
.get('/get',function(req,res){
  console.log('Getting ask request from Client and checking if new updates to be sent ...');
  res.header("Access-Control-Allow-Origin", "*");
if(check) //only responds to client if new updates
{
  console.log('Responding to Client with new updates');
  res.json({lat: lat, longi: longi});
}
else
{
  console.log('No new updates to be sent to client.')
  res.send('done');
}

})

.post('/pushTtn',function(req,res){
  User.findOne({'username': 'siffogh'}, function(err,user){
    if(user)
    {

        user.settings.ttn.push(JSON.parse(req.body.body).ttn);
        user.save(function(err){
        if(err)
          throw err;
        });
    }
    
  });
  console.log("Push TTN: " + JSON.parse(req.body.body).ttn);
})

.post('/popTtn',function(req,res){
    User.findOne({'username': 'siffogh'}, function(err,user){
    if(user)
    {
      var i = user.settings.ttn.indexOf(JSON.parse(req.body.body).ttn);
      user.settings.ttn.splice(i,1);
      user.save(function(err){
      if(err)
        throw err;
      });
    }
      
  });
  console.log("Pop TTN: " + JSON.parse(req.body.body).ttn);
})

.get('/getInfo',function(req,res){
  User.findOne({'username': 'siffogh'}, function(err,user){
    if(user)
    {
      res.header("Access-Control-Allow-Origin", "*");
      res.json({lat: user.settings.homeAddress.lat, lng: user.settings.homeAddress.lng, arr: user.settings.ttn});
    }
  });
 })

.post('/setLocation',function(req,res){
  console.log('Updating User Location ...');
  User.findOne({'username': 'siffogh'}, function(err,user){
    if(user)
    {
        user.settings.homeAddress.lat = JSON.parse(req.body.body).lat;
        user.settings.homeAddress.lng = JSON.parse(req.body.body).lng;
        user.save(function(err){
        if(err)
          throw err;
        });
    }
    
  });
  console.log("User Location Updated");
})

.get('/getNotifications',function(req,res){
  User.findOne({'username': 'siffogh'}).populate('notifications').exec(function(err,user){

    if(user)
    {
      console.log(user.username);
      console.log(user.notifications[0].content.text);
      res.header("Access-Control-Allow-Origin", "*");
      res.json({notifications: user.notifications});
    }

  });
})

.get('/checkNotifications',function(req,res){
  console.log('Updating checked notifications ...');
  User.findOne({'username': 'siffogh'}).populate('notifications').exec(function(err,user){
    if(user)
    {
      user.notifications.forEach(function(notification){
        notification.checked = true;
        notification.save(function(err){
          if(err)
            throw err;
        });
      });

      res.send('done updating');
    }
  });
});

}