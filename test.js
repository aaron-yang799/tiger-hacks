async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/mediabiasgroup/babe-v3-roberta-fully-trained",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "Opinion Today — In an extravagant display of environmental tokenism, the City Council has decided to throw taxpayer money at a so-called Green Lungs project, planting 2,000 trees in urban parks that few asked for and fewer still will use. Defying common sense in a time when budget deficits are ballooning, the Council, in what some see as a stunt to polish its green credentials, has chosen to prioritize leaves over law enforcement. As crime statistics take a backseat, one wonders if future muggers will hide behind the council's expensive foliage."}).then((response) => {
	console.log(JSON.stringify(response));
});