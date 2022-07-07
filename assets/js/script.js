var apiUrl = "https://api.publicapis.org/entries"

fetch(apiUrl).then(function(response) {
    if (response.ok) {
        response.json().then( function (data) {
            console.log(data);
            console.log(data.entries[0].Category)
            var catArr = []
            for (var i=0; i<data.entries.length; i++) {

                var catEntry = data.entries[i].Category;
                // var catEntry2 = data.entries[i+1].    
                console.log("catEntry", catEntry);

                catArr.push(catEntry);
            }
            // console.log("whole enchilada", catArr);
            var catSet = new Set(catArr);
            var newCatArr = Array.from(catSet);
            // console.log ("newCatArr", newCatArr);

            for (i=0; i<catArr.length; i++) {
                var item =
            }
        })
    }
})

