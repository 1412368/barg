var firebase = require("firebase");
var q = require('q');


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDP3YCSVpXvMBUIYm5PeOjHReBozGTU2JQ",
    authDomain: "avicii-1ac78.firebaseapp.com",
    databaseURL: "https://avicii-1ac78.firebaseio.com",
    projectId: "avicii-1ac78",
    storageBucket: "avicii-1ac78.appspot.com",
    messagingSenderId: "578476661001"
  };
var defaultApp = firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database();

var q=require('q');

var getLength= function(){
  let d=q.defer();
  let length=0;
  var pickRef= database.ref('pick');
  pickRef.on('value',function(snapshot){
    d.resolve(snapshot.val().length);
  })
  return d.promise ;
}
exports.insertPicks = (pick)=>{
  let d=q.defer();
  getLength().then(length=>{
    var newPickRef= database.ref('pick/'+length);
    newPickRef.set({
    current_lat: null,
    current_lng: null,
    name: pick.name,
    note: pick.address,
    state: "NOT GEO",
    type: pick.type,
    id:length,
  }); 
  console.log(newPickRef.key);
  return newPickRef.key;

  })
}
exports.loadPicks = () => {
    let d = q.defer();
    var pickList = firebase.database().ref('pick');
    pickList.on('value', function(snapshot) {
      var picks = snapshot.val();
      reformatData(picks).then(data => {
        d.resolve(data);
      });
  });
  return d.promise;
};
var picksNotGeo = function(data){
  console.log(array);

}
exports.loadPicksNotGeo = () => {
  let d = q.defer();
  var pickList = firebase.database().ref('pick');
  pickList.on('value', function(snapshot) {
    var picks = snapshot.val();
    let array=[];
    picks.forEach(item=>{
    if(item.state==='NOT GEO')
      array.push(item);
    },this);
    d.resolve(array);
  });
  return d.promise;
};
exports.loadPickWithId = (id, res) => {
  var pickList = firebase.database().ref('pick');
    pickList.on('value', function(snapshot) {
      var picks = snapshot.val();
      reformatData(picks).then(data=>{
        flag = false;
        data.forEach(function(element) {
          if (parseInt(element.id) === parseInt(id)){
            flag = true;
            console.log({
              picks:element
            })
            res.json({ 
              picks: element
            });
          }
        }, this);
        if (flag == false){
          res.json({ 
              message: 'Error'
            });
        }
      });
  });
};
function map(element)
{
  let d=q.defer();
  if (element.id_driver != null){
            loadDriverDetail(element).then(info=>{
                //console.log(info);
              element.driver = info;
              d.resolve(element);
            });
        }
  else d.resolve(element);
  return d.promise
}
function reformatData(picks){
  let d = q.defer();
  let array=[];
  picks.forEach(function(element){
    map(element).then(result=>{
      array.push(result);
      if (array.length===picks.length){
        d.resolve(array);
      }
    })
  })   

  return d.promise ;
}

function loadDriverDetail(obj, callback){
    d2 = q.defer();
    var driver = firebase.database().ref('bike');
        driver.on('value', function(snapshot) {
        var bikes = snapshot.val();
        for (var i = 0; i< bikes.length; i++){
            if (bikes[i].id == obj.id_driver){
                d2.resolve(bikes[i]);
            }
        }
    });
    return d2.promise;
}

exports.loadDrivers = () => {
  let d = q.defer();
    var locationList = firebase.database().ref('bike');
    locationList.on('value', function(snapshot) {
      d.resolve(snapshot.val());
  });
  return d.promise;
};

exports.updateState = (id, obj) => {
  let d = q.defer();
  var pickList = firebase.database().ref('pick');
    pickList.on('value', function(snapshot) {
    var data = snapshot.val();
    data[id-1] = obj;
    pickList.update(data);
    d.resolve({mes : 'Updated'});
  });
  return d.promise;
};
