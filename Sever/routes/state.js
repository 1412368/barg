var express = require('express');
var router = express.Router();
var db = require('../db');
var db2 = require('../db2');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   db.loadPicks(res);
// });

router.get('/not_geo', function(req, res, next) {
    // db.loadPicksNotGeo().then(data => {
    //   res.send(data);
    // });
    db2.loadPicksNotGeo().then(data =>{
        console.log(data);
        res.send(data);
    });
});

router.get('/', function(req, res, next) {
    db2.loadPicks().then(data=>{
        res.send(data);
    });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    //db.loadPickWithId(req.params.id, res);
    db2.loadPickWithId(req.params.id, res);
});

router.put('/geo/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    db2.updateState(id, req.body).then(message => {
        res.json({mes : message});
    });
});
module.exports = router;
