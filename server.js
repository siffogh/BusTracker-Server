var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var http = require('http');
var server = http.createServer(app);
var lat, longi;
var check = false; //check if new updates
server.listen(8001, function () {
    console.log('Listening on 8001');
});
app.post('/post',function(req,res){
  console.log('Getting post from Bus and checking if new updates...');
  if( (lat != JSON.parse(req.body.body).lat) || (longi != JSON.parse(req.body.body).longi) )
{  
  console.log('We have new updates');
  check = true;
  lat = JSON.parse(req.body.body).lat;
  longi = JSON.parse(req.body.body).longi;
  console.log('lat:'+lat+' lng: '+longi);
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
 
});