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

query({"inputs": "Trump denies any wrongdoing in all legal matters and has pleaded not guilty in all of the criminal cases – which relate not just to his efforts to remain president by overturning the 2020 election and his treatment of classified material after his presidency but also to a hush-money scheme that may have helped him win the White House in 2016."}).then((response) => {
	console.log(JSON.stringify(response));
});