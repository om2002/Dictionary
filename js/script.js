// You have pretend to use a word api which will contain an object and you hve to print definition from all the results of that word api.
// YOu have to take input from an input tag.
// You have to print it in the dom
// If you are using bootstrap then its a plus

document.getElementById('textSubmit').addEventListener('click', inputListener)

function inputListener() {
    let text = document.getElementById('text');

    let textValue = text.value;
    text.value = "";

    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';
    // console.log(textValue)
    url = url + textValue;
//     console.log(url);


    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (this.status === 200) {

            let obj = JSON.parse(this.responseText);
//             console.log(obj);

            html = "";
            let Meaning = obj[0].meanings[0].definitions;

            // console.log(Meaning)

            Array.from(Meaning).forEach(element => {
                html += `<div class="card text-white bg-success mb-3" style="max-width: 40rem;">
                <div class="card-header">Defination And Example</div>
                <div class="card-body">
                    <p class="card-text"> Definition  :  ${element.definition}</p>
                    <p class="card-text">Example  :   ${element.example}</p>
                </div>
                </div>`


                let Synonyms = "";
                if (element.synonyms != undefined && element.synonyms.length != 0) {

                    let str = `<div class="card text-dark bg-warning mb-3" style="max-width: 18rem;">
                    <div class="card-header">Synonyms</div>
                    <div class="card-body">
                    <h5 class="card-title">Synonyms</h5>
                    <ul>`

                    for (let index = 0; index < element.synonyms.length; index++) {
                        Synonyms += `<li>${element.synonyms[index]}</li>`;
                    }

                    str += Synonyms;

                    str += `</ul> 
                       </div>
                     </div>`
                    html += str;
                }

            });
            document.getElementById('result').innerHTML = html;

        }
        else {
            html = "";

            html += `<div class="card text-white bg-danger mb-3" style="max-width: 30rem;">
                        <div class="card-header">Element Not Found</div>
                        <div class="card-body">
                        <p class="card-text">Meaning is not found in our Dictionary</p>
                        </div>
                    </div>`
        }

        document.getElementById('result').innerHTML = html;
    }

    xhr.send();
}

