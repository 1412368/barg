var express = require('express');
var router = express.Router();
var db = require('../db');
var db2 = require('../db2');
var q = require('q');

router.get('/', function(req, res, next) {
  console.log("sever driver");
  console.log(req);
  db2.loadDrivers().then(drivers => {
    console.log(req.query);
    filter(drivers, req.query.lat, req.query.lng, req.query.type, req.query.max_distance).then(filter => {
      //only get 10 nearest drivers
      for (var i = 0; i< filter.length - 1; i++){
        for(var j = i+1; j< filter.length; j++){
          if(getDistanceFromLatLonInKm(req.query.lat, req.query.lng, filter[i].current_lat, filter[i].current_lng) > getDistanceFromLatLonInKm(req.query.lat, req.query.lng, filter[j].current_lat, filter[j].current_lng)){
            temp = filter[i];
            filter[i] = filter[j];
            filter[j] = temp;
          }
        }
      }
      if(filter.length > 10){
        var top10nearest = filter.slice(0, 10);
        res.json({ 
          top_10_nearest : top10nearest
        });
      }else{
        res.json({ 
          top_10_nearest : filter
        });
      }
    });
  });
});
router.post('/position',function(req, res) {
  db2.updateDiverPos(req.params.id,req.params.lat,req.params.lng)
  .then((err)=>{
    res.status(200).json({message: "updated"});
  });
})
function filter(drivers, origin_lat, origin_lng, type, max_km_distance){
  let d = q.defer();
  var arr = [];
  drivers.forEach(function(element) {
    var dest = {lat: element.current_lat, lng: element.current_lng};
    if(getDistanceFromLatLonInKm(origin_lat, origin_lng, dest.lat, dest.lng) <= max_km_distance && element.state === 'AVAILABLE' && element.type === type){
      arr.push(element);
    }
  }, this);

  d.resolve(arr);
  return d.promise;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports = router;
