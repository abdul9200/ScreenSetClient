function ordonnance(doc){
  var res=[];
  for(i=0;i<doc.length;i++){
    res.push({"type":doc[i]["type"],"path":"/home/pi/Desktop/orderMi/"+doc[i]["name"],"duration":doc[i]["duration"]})
  }
  return JSON.stringify(res);
}
function getdoc(){
  ip=require('os').networkInterfaces()["wlan0"][0]["address"] ;
  mac=require('os').networkInterfaces()["wlan0"][0]["mac"];
  const testFolder = '/home/pi/Desktop/orderMi';
const fs = require('fs');
var list=[];

fs.readdirSync(testFolder).forEach(file => {
  list.push(file);
});
  res={"id":1,
	"ip":ip,
        "mac":mac,
	"names":list
      }

      return res;
}
console.log(getdoc());
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://192.168.43.155:8080/screen/sendMacIp',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(getdoc())

};
setInterval(()=>{
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));

  const fs = require('fs');
  fs.writeFile('orderMi/OrderMedia.json',ordonnance(JSON.parse(response.body)),err=>{
    if(err){
      console.error(err)
      return;
    }
    
    
    });
});},5000)
