console.log("CHORMY");

const para = [];

let paragraphs = document.getElementsByTagName('p');
for(elt of paragraphs)
{
    para.push(elt);
}

for (let i = 0; i < para.length; i++) {
    console.log(para[i]);
}

function decideBox(index, bias_rating){
    if(index > bias_rating)
    {
        
    }
}