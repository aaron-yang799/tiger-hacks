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

query({"inputs": "He alleges a “witch hunt” against him and says the varied legal actions are examples of election interference to keep him from the White House. But each trial has its own distinct storyline to follow."}).then((response) => {
	console.log(JSON.stringify(response));
});