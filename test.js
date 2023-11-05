/*
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Social-Media-Fairness/Classifier-Bias-SG",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "George Washington is the first president of the united states"}).then((response) => {
	console.log(JSON.stringify(response));
});
*/

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

var test = ["I love donald trump", "I hate obama", "I love donald trump becasue i met him."];

var joined = test.join(". ");

query({"inputs": joined}).then((response) => {
	//console.log(JSON.stringify(response));
	response = JSON.stringify(response);
	var jsonObject = JSON.parse(response);
	var numbersArray = extractNumbers(jsonObject); // Get all numbers in an array
	console.log(numbersArray);

});
