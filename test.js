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

query({"inputs": "He alleges a “witch hunt” against him and says the varied legal actions are examples of election interference to keep him from the White House. But each trial has its own distinct storyline to follow."}).then((response) => {
	//console.log(JSON.stringify(response));
	response = JSON.stringify(response);
	var jsonObject = JSON.parse(response);
	var numbersArray = extractNumbers(jsonObject); // Get all numbers in an array
	console.log(numbersArray); //prints array

});
