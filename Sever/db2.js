var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/barg', { useMongoClient: true });
mongoose.Promise = global.Promise;
var autoIncrement = require("mongoose-auto-increment");

var db = mongoose.connection;

console.log(mongoose);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});
autoIncrement.initialize(db);

// schema
var bikeSchema = mongoose.Schema({
    current_lat: Number ,
    current_lng: Number ,
    driver: String,
    id: Number ,
    state: String,
    type: String
});
var pickSchema = mongoose.Schema({
    current_lat: Number,
    current_lng: Number,
    id_driver: Number,
    id: Number,
    name: String,
    note: String,
    state: String,
    type: String
})

pickSchema.statics.findByID = function(id, cb) {
  return this.find({ id: id }, cb);
};
bikeSchema.statics.findByID = function(id, cb) {
  return this.find({ id: id }, cb);
};

pickSchema.plugin(autoIncrement.plugin, 'pick');
pickSchema.plugin(autoIncrement.plugin, { model: 'pick', field: 'id' });
bikeSchema.plugin(autoIncrement.plugin, { model: 'bike', field: 'id' });

var Bike= db.model("bike",bikeSchema);
var pick= db.model("pick",pickSchema);

exports.insertPicks = (data)=>{
  var input= new pick({
    current_lat: null,
    current_lng: null,
    name: data.name,
    note: data.address,
    state: "NOT GEO",
    type: data.type,
  });
  input.save((err,obj)=>{
    if (err) console.err(err);
    console.log(input);
  })
  return input;
}
exports.loadPicks = () => {
  return new Promise((resolve, reject)=>{
    pick.find(function(err, data){
      if (err) reject(err);
      resolve(data);
    })
  })
};
exports.loadPicksNotGeo = () => {
  return new Promise((resolve, reject)=>{
    pick.find({state: "NOT GEO"}, (err, data)=>{
      if (err) reject(err);
      resolve(data);
    })
  })
};
exports.loadPickWithId = (id, res) => {
    pick.findByID(id ,function (err,Pick){
    if (err) res.json(err);
      Bike.findByID(Pick[0].id_driver,(err,driverData)=>{
        if (err) res.json(err);
        res.json({picks:{
          current_lat: Pick[0].current_lat,
          current_lng: Pick[0].current_lng,
          id_driver: Pick[0].id_driver,
          id: Pick[0].id,
          name: Pick[0].name,
          note: Pick[0].note,
          state: Pick[0].state,
          type: Pick[0].type,
          driver: driverData[0]}
        });
      })
  })
};
exports.updateState = (id, obj) => {
  return new Promise((resolve, reject)=>{
    pick.findOneAndUpdate(
      {id: id},
      {current_lng: obj.current_lng,
       current_lat: obj.current_lat,
       state: "GEO"
      },(err, updated)=>{
        if(err) reject(err);
        resolve (updated);
      })
  })
};
exports.loadDrivers = () => {
  return new Promise((resolve, reject)=>{
    Bike.find(function(err, Bikes){
      if (err) reject(err);
        resolve(Bikes);
    })
  })
};
exports.updateDiverPos = (id, lat, lng) =>{
  return new Promise((resolve, reject)=>{
    bike.findOneAndUpdate(
      {id: id},
      {current_lng: lat,
       current_lat: lng},
       (err, updated)=>{
        if(err) reject(err);
        resolve (updated);
       })
  })
}
exports.loadDriverWithId=(id)=>{
  return new Promise ((resolve, reject)=>{
    Bike.findByID()
  })
}