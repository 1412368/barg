var express = require('express');
var router = express.Router();

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC56kS8KL79vCuKibEG_OVG1ZNkx3jnxdM'
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("geo");
});

router.get('/geo', function(req, res, next) {
  console.log(req.query.loc);
  googleMapsClient.geocode({
    address: req.query.loc
  }, function(err, response) {
    if (!err) {
      console.log(response.json.results);
      if(response.json.results.length > 0){
          res.json(response.json.results);
      }else{
        res.json({message: "No place id"});
      }
    }
  });
});
router.get('/reversegeo', function(req, res, next) {
  googleMapsClient.reverseGeocode({ latlng: [req.query.lat, req.query.lng] }, function(err, response){
        if (!err) {
      console.log(response.json.results[0]);
      if(response.json.results.length > 0){
          res.json(response.json.results[0]);
      }else{
        res.json({message: "No place id"});
      }
    }
  });
});
// googleMapsClient.geocode({
//   address: 'Nguyen Van Cu'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });

module.exports = router;
