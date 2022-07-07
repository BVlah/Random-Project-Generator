var apiUrl = "https://api.publicapis.org/entries";

fetch(apiUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      console.log(data.entries[0].Category);
      var catArr = [];
      for (var i = 0; i < data.entries.length; i++) {
        var catEntry = data.entries[i].Category;
        // var catEntry2 = data.entries[i+1].
        // console.log("catEntry", catEntry);

        catArr.push(catEntry);
      }

      catCount(catArr);
      // // console.log("whole enchilada", catArr);
      // var catSet = new Set(catArr);
      // var newCatArr = Array.from(catSet);
      // console.log ("newCatArr", newCatArr);

      // // for (i=0; i<catArr.length; i++) {
      // //     var item =
      // // }
    });
  }
});

// let text =
//       "Some of the biggest and most expensive transportation projects in the world have involved building bridges. Bridges are crucial links that carry cars, trucks and trains across bodies of water, mountain gorges or other roads. As a result, they are one of the most important aspects of civil engineering and are subject to intense scrutiny, especially when they collapse. Bridge collapses can be tragic events, leading to loss of life and serious property damage. That is why bridge engineers, designers and builders must always take their jobs very seriously. The best way for them to prevent these accidents is to understand why bridges collapse in the first place. Understanding bridge collapses can lead to major changes in the design, construction and safety of future building projects. The following are main reasons why bridges fall.";
//     text = text.replace(/[.,]/g, "");
//     text = text.toLocaleLowerCase();

var catCount = function (catArr) {
  const wordArray = catArr;
  const wordCount = {};
  wordArray.forEach((item) => {
    if (wordCount[item] == null) wordCount[item] = 1;
    else {
      wordCount[item] += 1;
    }
  });

//   let obj = { you: 100, me: 75, foo: 116, bar: 15 };

  let entries = Object.entries(wordCount);
  // [["you",100],["me",75],["foo",116],["bar",15]]

  let sorted = entries.sort((a, b) => b[1] - a[1]);
  // [["bar",15],["me",75],["you",100],["foo",116]]
  display(sorted);
};

var display = function(sorted) {
    console.log(sorted);};