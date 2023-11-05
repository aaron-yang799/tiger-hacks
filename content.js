const para = [];

let paragraphs = document.getElementsByTagName('p');
for(elt of paragraphs)
{
    para.push(elt);
}

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

window.onload = function() {
    //decideBox();
    decidePie();
};

