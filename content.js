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



console.log("CHEMOI");

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

    const boxIds = [
        "SumBoxR1", "SumBoxR2", "SumBoxR3", "SumBoxR4", "SumBoxR5",
        "SumBoxC1", "SumBoxC2", "SumBoxC3", "SumBoxC4", "SumBoxC5",
        "SumBoxL1", "SumBoxL2", "SumBoxL3", "SumBoxL4", "SumBoxL5",
        "OppBoxR1", "OppBoxR2", "OppBoxR3", "OppBoxR4", "OppBoxR5",
        "OppBoxC1", "OppBoxC2", "OppBoxC3", "OppBoxC4", "OppBoxC5",
        "OppBoxL1", "OppBoxL2", "OppBoxL3", "OppBoxL4", "OppBoxL5"
    ];
    
    const infoIds = [
        "SumInfo", "OppInfo", "CentBox"
    ];
    
    const data = {
        labels: ['Right Lean', 'Central', 'Left Lean'],
        datasets: [{
            data: [30, 30, 40], // Values for each slice
            backgroundColor: ['red', 'grey', 'blue'], // Colors for each slice
        }],
    };
    
    
    function getBias(index){
        var indPer = index % 15; //essentially cuts the array into halves so the same operations can be done at their seperate indexes.
        if(indPer <= 4){
            return right;
        }else if(indPer <= 9){
            return center;
        }else{
            return left;
        }
    }

    function getColor(index){
        var indPer = index % 15; //use array index to decide what color to make the box upon conditions of course.
        console.log(indPer);
        if(indPer <= 4){
            return 'red';
        }else if(indPer <= 9){
            return 'black';
        }else{
            return 'blue';
        }
    }
    
    function decideBox(){
        const elements = document.querySelectorAll('.mini-box')
        var i = 0;
        elements.forEach(function(element) {
            const elementName = boxIds[i];
            const bias_rating = getBias(i);
            const bias_color = getColor(i);
            const elemIndMatch = elementName.match(/\d/);
            if (elemIndMatch) {
                const elemInd = parseInt(elemIndMatch[0], 10) * 20; // Extract and convert to an integer
                console.log(elemInd);
                if(elemInd > bias_rating)
                {
                    element.style.backgroundColor = 'grey'; 
                }else{
                    element.style.backgroundColor = bias_color;
                };
            }
            i = i + 1;
        });
    }
    
    function displayBias(){
        var contentToWrite = "This is the content to be added to the paragraph.";
        const elements = document.querySelectorAll('p');
        var i = 0;
        // Find the paragraph element by its ID
        elements.forEach(function(element) {
            const elementName = infoIds[i];
            var paragraphElement = document.getElementById(elementName);
    
            // Create a text node with your content
            var textNode = document.createTextNode(contentToWrite);
    
            // Append the text node to the paragraph element
            paragraphElement.appendChild(textNode);
            i = i + 1;
        });
    }
});
