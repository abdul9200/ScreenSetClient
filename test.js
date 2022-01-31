function ordonnance(doc){
  var res=[];
  for(i=0;i<doc.length;i++){
    res.push({"type":doc[i]["type"],"path":"/home/pi/Desktop/orderMi/"+doc[i]["name"],"duration":doc[i]["duration"]})
  }
  return JSON.stringify(res);
}
function list(){
  const fs = require('fs');
var list=[];
const testFolder = '/home/pi/Desktop/orderMi';
fs.readdirSync(testFolder).forEach(file => {
  list.push(file);
});
return list;
  
}

function getdoc(){
  ip=require('os').networkInterfaces()["eth0"][0]["address"] ;
  mac=require('os').networkInterfaces()["eth0"][0]["mac"];
  

  res={"id":1,
	"ip":ip,
        "mac":mac,
	"names":list()
      }
console.log(list());
      return res;
}

var request = require('request');

setInterval(()=>{
  var options = {
  'method': 'POST',
  'url': 'http://192.168.1.6:8080/screen/sendMacIp',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(getdoc())

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));

  const fs = require('fs');
  fs.readFile('./OrderMedia.js', 'utf8', function (err,data) {
  if (err) {  return console.log(err);}
  if(data!="json="+ordonnance(JSON.parse(response.body))){
     fs.writeFile('./OrderMedia.js',"json="+ordonnance(JSON.parse(response.body)),err=>{
    if(err){
      console.error(err)
      return;
    }
    
    
    });
    var child_process = require("child_process");

var task1 = child_process.exec("/usr/bin/chromium-browser --kiosk  --disable-restore-session-state file:///home/pi/Desktop/test.html", function (error, stdout, stderr) {
console.log("stdout: " + stdout);
console.log("stderr: " + stderr);
if (error !== null) {
console.log("exec error: " + error);
}
});
    
    
    
    
  }
});
 
});},5000)

