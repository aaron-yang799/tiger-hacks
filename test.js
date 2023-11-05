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
/* Test to join an array of strings, they get seperated by a period and space
let test = ["I love trump", "I love obama", "Animals are cool"];

test = test.join(". ");
console.log(test)
*/
query({"inputs": test}).then((response) => {
	console.log(response);
	const sortOrder = { 'left': 1, 'center': 2, 'right': 3 };

	response[0].sort((a, b) => sortOrder[a.label] - sortOrder[b.label]);

	//console.log(JSON.stringify(response));
	response = JSON.stringify(response);
	var jsonObject = JSON.parse(response);
	var numbersArray = extractNumbers(jsonObject); // Get all numbers in an array
	console.log(numbersArray); //prints array
});
