// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/barg', { useMongoClient: true });
// mongoose.Promise = global.Promise;
// // schema
// var bikeSchema = mongoose.Schema({
//     current_lat: Number ,
//     current_lng: Number ,
//     driver: String,
//     id: Number ,
//     state: String,
//     type: String
// });
// var pickSchema = mongoose.Schema({
// 	current_lat: Number,
//     current_lng: Number,
//     id_driver: Number,
//     id: Number,
//     name: String,
//     note: String,
//     state: String,
//     type: String
// })

// pickSchema.statics.findByID = function(id, cb) {
//   return this.find({ id: id }, cb);
// };

// var Bike= mongoose.model("bike",bikeSchema);

// var pick= mongoose.model("pick",pickSchema);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("connected");
// });

// var Phat= new Bike({
// 	current_lat: 10.74826,
//     current_lng: 106.6354176,
//     driver: "Nguyen Hong Phat",
//     id: 1,
//     state: "AVAILABLE",
//     type: "PREMIUM"
// })

// Phat.save( (err, obj)=>{
// 	if(err) return console.eror(err);
// 	console.log("saved");
// })

// Bike.find((err, bike)=>{
// 	if (err) return console.err(err);
// 	console.log(bike);
// })

// Bike.find({id: 1}, (err,obj)=>{
// 	if (err) return console.err(err);
// 	console.log(obj);
// })


// var Nhan= new pick({
// 	current_lat: 10.745125514547103,
// 	current_lng: 106.62195425980914,
// 	id: 4,
// 	id_driver: 13,
// 	name: "Hieu Nhan",
// 	note: "Sunburst",
// 	state: "PICKED",
// 	type: "NORMAL",
// })
// Nhan.save((err,obj)=>{
// 	if(err) console.err(err);
// 	console.log("saved");
// })
