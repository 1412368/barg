var fname = ["Thien", "Lam"];
var mname = ["Hong", "Hieu", "Hung"];
var lname = ["Trang", "Nhi"];
var type = ["PREMIUM", "NORMAL"];
var state = ["GEO", "NOT GEO", "PICKED"];
var note = ["Sunburst", "Mesmerize", "Cool", "Candyland", "Holiday"];

const fs = require('fs');

var picks = [];
var baseLat = 10.745125514547104;
var baseLng = 106.62195425980914;
var id = 3;
for (var i = 0; i< fname.length; i++){
    for (var j = 0; j< mname.length; j++){
        for (var k = 0; k< lname.length; k++){
            var obj = {}; 

            id += 1;
            obj.id = id;
            obj.name = fname[i] + " " + mname[j] + " " + lname[k];
            obj.current_lat = baseLat + 0.0004 * i * j * k;
            obj.current_lng = baseLng + 0.0002 * i * j * k;
            obj.type = type[(id + 1) % 2];
            obj.state = state[(id + 1) % 3];
            if(state[(id + 1) % 3] === 'PICKED'){
                obj.id_driver = 3*id + 1;
            }
            obj.note = note[(id + 1) % (note.length)];
            picks.push(obj);
        }
    }
}
//console.log(drivers);

fs.writeFile("./generatePicks.json", JSON.stringify(picks), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 