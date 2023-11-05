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


const para = [];
console.log("CHEMOI");
let paragraphs = document.getElementsByTagName('p');
for(elt of paragraphs)
{
    para.push(elt);
}

let test = para.join(". ");
console.log(test);
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


const boxIds = [
    "SumBox1", "SumBox2", "SumBox3", "SumBox4", "SumBox5",
    "OppBox1", "OppBox2", "OppBox3", "OppBox4", "OppBox5",
    "CentBox1", "CentBox2", "CentBox3", "CentBox4", "CentBox5"
];

const data = {
    labels: ['Right Lean', 'Central', 'Left Lean'],
    datasets: [{
        data: [30, 30, 40], // Values for each slice
        backgroundColor: ['red', 'grey', 'blue'], // Colors for each slice
    }],
};

for (let i = 0; i < para.length; i++) {
    console.log(para[i]);
}

function getBias(){
    return 1
}

function decideBox(){
    const elements = document.querySelectorAll('.mini-box')
    var i = 0;
    elements.forEach(function(element) {
        const elementName = boxIds[i];
        const bias_rating = getBias();
        const elemIndMatch = elementName.match(/\d/);
        if (elemIndMatch) {
            const elemInd = parseInt(elemIndMatch[0], 10); // Extract and convert to an integer
            console.log(elemInd);
            if(elemInd > bias_rating)
            {
                element.style.backgroundColor = 'rgb(235, 235, 235)'; 
            }else{
                element.style.backgroundColor = 'green';
            };
        }
        i = i + 1;
    });
}

function decidePie(){
    const ctx = document.getElementById("myPieChart").getContext("2d");

    const config = {
        type: 'pie',
        data: data,
    };
    const myPieChart = new Chart(ctx, config);
}

//This is the utilization of chatgpt API to generate a summary of the webpage content
const content = "I need a summary of this message."
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

var helpme = `Summarize the content: ${content}`;
console.log(helpme);
//this fetch call uses the url and key to gain access to gpts API. Then a prompt is created that requests a summary of the provided content of max character size 150.
fetch(apiUrl, {
    method: "POST", //means we are sending data to GPT
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ 
        prompt: `Summarize the webpage: ${content}`,
        max_tokens: 150,
    }),
})
    .then((response) => response.json())
    .then((data2) => {
        const summary = data2.choices[0].text;
        console.log(summary);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

window.onload = function() {
    //decideBox();
    decidePie();
};

