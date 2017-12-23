var fname = ["Nguyen", "Tran", "Huynh", "Le", "Dinh"];
var mname = ["Hong", "Hieu", "Hung", "Anh"];
var lname = ["Phat", "Nam", "Nhan", "Thien", "Long"];
var state = ["NO AVAILABLE", "AVAILABLE"];
var type = ["PREMIUM", "NORMAL"];

const fs = require('fs');

var drivers = [];
var baseLat = 10.745625514547104;
var baseLng = 106.62495425980914;
var id = 0;
for (var i = 0; i< fname.length; i++){
    for (var j = 0; j< mname.length; j++){
        for (var k = 0; k< lname.length; k++){
            //console.log(fname[i] + " " + mname[j] + " " + lname[k]);
            var obj = {}; // 0 1 0

            id += 1;
            obj.id = id;
            obj.driver = fname[i] + " " + mname[j] + " " + lname[k];
            obj.current_lat = baseLat + 0.0005 * i * j * k;
            obj.current_lng = baseLng + 0.0009 * i * j * k;
            obj.state = state[id % 2];
            obj.type = type[(id + 1) % 2];
            drivers.push(obj);
        }
    }
}
//console.log(drivers);

fs.writeFile("./test.json", JSON.stringify(drivers), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 