function getdoc(){
  ip=require('os').networkInterfaces()["Wi-Fi 3"][1]["address"] ;
  mac=require('os').networkInterfaces()["Wi-Fi 3"][1]["mac"];
  res={"IP":ip,
        "MAC":mac,
      "id":"112-112-112"}

      return res;
}
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:8080/conge/add',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(getdoc())

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});