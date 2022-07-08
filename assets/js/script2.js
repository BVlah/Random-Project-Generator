var apiList = [];
var APIcount = 3;
var deepAPIKey = "16c2053f-5a8e-48a3-a138-401c3701ad2c"; 
// Function to call API API
var apisquared = function (choice) {
  fetch("https://api.publicapis.org/entries?category=" + choice).then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.entries.length; i++) {
          var apiEntry = {
            Name: data.entries[i].API,
            Description: data.entries[i].Description,
            Link: data.entries[i].Link,
          };
          apiList.push(apiEntry);
        }
        var apiChoices = [];
        for (i = 0; i < APIcount; i++) {
          apiChoices.push(apiList[Math.floor(Math.random() * apiList.length)]);
        }
        console.log(apiChoices);
      });
    }
  });
};

apisquared("Animals");

// Function to call random user
var randomUser = function (userCount, country) {
  fetch(
    "https://randomuser.me/api/1.4/?nat=" + country + "&results=" + userCount
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {});
    }
  });
};
// Function to call Random text

// var randomText = function() {
//     fetch("https://api.deepai.org/api/text-generator")
// }
// Function deal with output
// const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

// deepai.setApiKey('0e5cd2e1-4ffc-42a0-a872-ecc61061a463');

// (async function() {
//     var resp = await deepai.callStandardApi("text-generator", {
//             text: "Don't_date_him-gurl",
//     });
//     console.log(resp);
// })()