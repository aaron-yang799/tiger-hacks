console.log("CHORMY");

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
        console.log(elementName);
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
        }else console.log("shit");
        i = i + 1;
    });
}

function allBox(){
    const elements = document.querySelectorAll('.mini-box')
    elements.forEach(function(element) {
        element.style.backgroundColor = 'green';
        console.log('fuck')
    })
}

window.onload = function() {
    decideBox();
};