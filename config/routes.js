module.exports = function(app){
  var request = require('request');
  var User = require('../db/models/user-model');
var key = 'AIzaSyDNcANNVuMQChxW4XnQwqrPkeTipIBJY8c'; //Google Distance Matrix Server Key
var Driver = require('../db/models/driver-model');
var Notification = require('../db/models/notification-model')
var Trip = require('../db/models/trip-model');
var lat, longi;
var destination = '25.3120502,55.4927023';
var origin;
var str; //connection string to Google Distance Matrix
var check = false; //check if new updates
var newNotif = false;
var ntext='', nimg='', ndate='';
app.post('/post',function(req,res){
  console.log('Getting post from Bus and checking if new updates...');
  if( (lat != JSON.parse(req.body.body).lat) || (longi != JSON.parse(req.body.body).longi) )
  {  
    console.log('We have new updates');
    check = true;file:///C:/Users/Sifeddine/Desktop/ajax/index.html
    lat = JSON.parse(req.body.body).lat;
    longi = JSON.parse(req.body.body).longi;
    if(lat == 25.2180035 && longi == 55.4099200)
    {
      User.findOne({'username': 'siffogh'}, function(err,user){
        if(user)
        {
          var notif = new Notification();
          ndate = notif.date = new Date();
          ntxt = notif.content.text = 'The Bus is arriving in 2 min';
          nimg = notif.content.img = 'arrive.jpg';
          notif.save(function(err){
           if(err)
             throw err;
           user.notifications.push(notif._id);
           user.save(function(err){
            if(err)
              throw err;
            console.log('notification pushed');
          });
         });
          

        }
      });
    }

    if(lat == 25.2194012&& longi == 55.4084609)
    {
      newNotif = true;
      Trip.findOne({'active': 'true'}, function(err,trip){
        if(trip)
        { 
          trip.active = false;
          trip.save(function(err){
            if(err)
              throw err;
          });
        }
      });
      User.findOne({'username': 'siffogh'}, function(err,user){
        if(user)
        {
          var notif = new Notification();
          notif.date = new Date();
          notif.content.text = 'The Bus is waiting outside';
          notif.content.img = 'arrive.jpg';
          notif.save(function(err){
           if(err)
             throw err;
           user.notifications.push(notif._id);
           user.save(function(err){
            if(err)
              throw err;
            console.log('notification pushed');
          });
         });
          
        }
      });
    }
    origin = '' + lat + ',' + longi;
    console.log('lat:'+lat+' lng: '+longi);
    var str = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+'&destinations='+destination+'&mode=driving&key='+key;
    request(str,function(error,response,body){
     if(!error)
     {
      console.log(JSON.parse(body).rows[0].elements[0].duration.text + ' to destination');
    }

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
   newNotif = false;
  console.log('Getting ask request from Client and checking if new updates to be sent ...');
  res.header("Access-Control-Allow-Origin", "*");
if(check) //only responds to client if new updates
{
   User.findOne({'username': 'siffogh'}).populate('notifications').sort({ "notifications.date" : -1} ).exec(function(err,user){
  console.log('Responding to Client with new updates');
  user.notifications.forEach(function(notif,index){
    if(! notif.checked)
      newNotif = true;
  });
  
   console.log('**************'+newNotif);
   res.json({lat: lat, longi: longi, newNotif: newNotif});
  });
  

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
      res.json({currentLoc: user.settings.currentLocation, lat: user.settings.homeAddress.lat, lng: user.settings.homeAddress.lng, arr: user.settings.ttn});
    }
  });
})

.post('/setLocation',function(req,res){
  console.log('Updating User Location ...');
  User.findOne({'username': 'siffogh'}, function(err,user){
    if(user)
    {
      if(JSON.parse(req.body.body).current == 't')
      {
        console.log('Current Location True');
        user.settings.currentLocation = true;
      }

      else
      {
        console.log('Current Location False');
        user.settings.currentLocation = false;
      }
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
  User.findOne({'username': 'siffogh'}).populate('notifications').sort({ "notifications.date" : -1} ).exec(function(err,user){

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
})
.post('/disableCurrentLoc',function(req,res){
 console.log('Current Location False');
 User.findOne({'username': 'siffogh'}, function(err,user){
  if(user)
  {
    user.settings.currentLocation = false;
    user.save(function(err){
      if(err)
        throw err;
    });
  }

});
})
.get('/getBusInfo',function(req,res){
  console.log('Getting Bus information ...');
  Driver.findOne({_id: '54b1375d20fb86f80bdb32e1'}, function(err,driver){
    if(driver)
    {
      console.log('found');
      res.header("Access-Control-Allow-Origin", "*");
      res.json({username: driver.username, fullName: driver.fullName, phone: driver.phone});
    }
  });
})

.post('/updateBusInfo',function(req,res){
  console.log('Updateing Bus information ...');
  Driver.findOne({_id: '54b1375d20fb86f80bdb32e1'}, function(err,driver){
    if(driver)
    {
      driver.username = JSON.parse(req.body.body).username;
      driver.fullName = JSON.parse(req.body.body).fullName;
      driver.phone = JSON.parse(req.body.body).phone;
      driver.save(function(err){
        if(err)
          throw err;
        console.log('Bus information updated');
      });
    }
  });
})

.post('/startBusTrip',function(req,res){
  console.log('Starting New Bus Trip ...');
  newNotif = true;

  Trip.findOne({'active': false},function(err,trip){
    if(trip)
    {

      console.log('Trip Found');
      trip.active = true;
      trip.direction = JSON.parse(req.body.body).direction;
      User.findOne({'username': 'siffogh'}, function(err,user){
        if(user)
        {
          console.log('Trip User found');
          trip.user = user._id;
          var notif = new Notification();
          ndate = notif.date = new Date();
          ntext = notif.content.text = 'The Bus just started a trip to pick up students';
          nimg = notif.content.img = 'arrive.jpg';
          notif.save(function(err){
           if(err)
             throw err;
           user.notifications.push(notif._id);
           user.save(function(err){
            if(err)
              throw err;
            console.log('notification pushed');
          });
         });

        }
      });
      Driver.findOne({_id: '54b1375d20fb86f80bdb32e1'}, function(err,driver){
        if(driver)
        {
          trip.driver = driver._id;
        }
      });

      trip.save(function(err){
        if(err)
          throw err;
        res.header("Access-Control-Allow-Origin", "*");
        res.send('');

      });
    }
  });
})

.post('/cancelBusTrip',function(req,res){
  console.log('Canceling trip ...');
  Trip.findOne({'active': 'true'}, function(err,trip){
    if(trip)
    { 
      trip.active = false;
      trip.save(function(err){
        if(err)
          throw err;
      });
    }
  });
})

.post('/delayBusTrip',function(req,res){
  console.log('Canceling trip ...');
  Trip.findOne({'active': true}, function(err,trip){
    trip.delay = JSON.parse(req.body.body).delay;
    trip.save(function(err){
      if(err)
        throw err;
    });
  });
});

}


