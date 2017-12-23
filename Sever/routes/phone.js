var express = require('express');
var router = express.Router();
var q=require('q');
var db = require('../db');
var db2=require('../db2.js');

router.post('/', function(req, res) {
  console.log(req.query);
  console.log("in");
  // res.send(db.insertPicks(req.body));
  res.send(db2.insertPicks(req.body));
});

module.exports = router;
