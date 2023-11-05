document.addEventListener('DOMContentLoaded', (event) => {
// Ensure the DOM is fully loaded before attaching event listeners
    document.getElementById('startButton').addEventListener('click', startProgram);
});


async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/valurank/distilbert-allsides",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

function extractNumbers(obj, numbers = []) {
	// Traverse all the object's properties
	for (let key in obj) {
	  if (typeof obj[key] === 'number') {
		// If the property is a number, push it to the numbers array
		numbers.push(obj[key]);
	  } else if (typeof obj[key] === 'object' && obj[key] !== null) {
		// If the property is an object, recurse into it
		extractNumbers(obj[key], numbers);
	  }
	}
	return numbers;
}


function startProgram() {
    // The code to start your program goes here
        console.log('Program started!');
    
        var para = document.getElementsByTagName('p');
        var allText = '';

        for (var i = 0; i < para.length; i++) {
            // Concatenate the text content of each <p> element
            allText += para[i].textContent + ' '; // Adding a space for readability
        }

        console.log(allText);

        let queryString = allText.substring(0,500);

        query({"inputs": queryString}).then((response) => {
            //console.log(response);
            const sortOrder = { 'left': 1, 'center': 2, 'right': 3 };

            response[0].sort((a, b) => sortOrder[a.label] - sortOrder[b.label]);

            //console.log(JSON.stringify(response));
            response = JSON.stringify(response);
            var jsonObject = JSON.parse(response);
            var numbersArray = extractNumbers(jsonObject); // Get all numbers in an array
            console.log(numbersArray); //prints array
            var left = numbersArray[0] * 100;
            var center = numbersArray[1] * 100;
            var right = numbersArray[2] * 100;

            console.log(left);
            console.log(center);
            console.log(right);


        });
}