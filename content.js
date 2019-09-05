// added button for popup
let li = document.createElement("li");
li.innerHTML = '<a id="makeOrder"><i class="fa fa-plus-square-o"></i><span> Order from file</span></a>';
document.querySelector("#top-links .list-inline").prepend(li);

//add popup
let divForm = document.createElement("div");
divForm.innerHTML = '<h1>Заказ:</h1> <form><textarea id="orderText" type="text" name="order" class="form-control input-lg" rows="20"></textarea><br></form><div class="set-div"><button type="button" class="btn" id="inpSku">Артикул<span class="badge badge-light">6</span></button><button type="button" class="btn" id="inpVal">Колонка для заказ<span class="badge badge-light">4</span></button><button type="button" class="btn" id="redirect">redirect<span class="badge badge-light">X</span></button></div><div class="btn-div" style=""><a id="btnClose" class="btn btn-lg">close</a><a id="btnForm" class="btn btn-lg">make order</a><a id="btnClear" class="btn btn-lg">clear</a></div>';
document.querySelector('body').append(divForm);

//button open popup
li.onclick = function() {
    let element = document.getElementById("divForm");
    element.classList.remove("hidden");
}

//button close popup
document.getElementById('btnClose').onclick = function() {
    let element = document.getElementById("divForm");
    element.classList.add("hidden");
}

//button clear text area
document.getElementById('btnClear').onclick = function() {
    document.getElementById("orderText").value = "";
}

// work with column
function searchColBD(elem, defValue) {
    if(localStorage.getItem(elem)== null){
        localStorage.setItem(elem,defValue);
    }
    document.querySelector(elem).value = parseInt(localStorage.getItem(elem));
    return localStorage.getItem(elem);
}

function updateCol(elem) {
    console.log('update ' + elem);
    if(parseInt(localStorage.getItem(elem)) != document.querySelector(elem).value){
        localStorage.setItem(elem,document.querySelector(elem).value);
    }
    return localStorage.getItem(elem);
}

let colSku = searchColBD('#inpSku input',1);
let colVal = searchColBD('#inpVal input',3);

//redirect
if(localStorage.getItem('redirect') == null){
    localStorage.setItem('redirect', true);
}

document.querySelector("#inpRed input").checked = localStorage.getItem('redirect') === 'true' ? true : false;

if(window.location.href.indexOf("limit=100") == '-1' && document.querySelector("#inpRed input").checked){
    document.location.href = window.location.href + '?limit=100';
}

function updateRed(){
    if(localStorage.getItem('redirect') != document.querySelector("#inpRed input").checked){
        localStorage.setItem('redirect', document.querySelector("#inpRed input").checked)
    }
}


//main script for make order
btnForm.onclick = function() {
    let maybeError = true;
    let element = document.getElementById("divForm");
    let textArea = document.getElementById("orderText").value.split("\n");
    let pageSku = document.querySelectorAll('#products-table tr');
    updateRed();
    colSku = updateCol('#inpSku input');
    colVal = updateCol('#inpVal input');

    alert('Check! \n' +
            colSku + ' Артикул - '  + textArea[0].split("	")[colSku-1] +
            '\nНаименование - ' + textArea[0].split("	")[colSku] +
            '\n' + colVal + ' Кол-во - ' + textArea[0].split("	")[colVal-1]
    );

    textArea.forEach(element => {
        let find = false;
        let inpSku = element.split("	")[colSku-1];
        let value = element.split("	")[colVal-1];
            
        if (element.length >= 2)
        {  
            pageSku.forEach(elmtSku => {
                let sku = elmtSku.querySelector('td:nth-child(2)').innerText;

                if (parseInt(value) > 0 && find == false && inpSku == sku) {
                    let maxOrd = 0;
                    maybeError = false;
                    find = true;
                    maxOrd = parseInt(elmtSku.querySelector('td:nth-child(4)').innerText.split(" ") [0]);

                    let deficiency = parseInt(value) - maxOrd;

                    if(maxOrd != NaN && deficiency >0 ){
                        let orderVal = (parseInt(value) - deficiency) - ((parseInt(value) - deficiency)%10);
                        elmtSku.querySelector('td:nth-child(5) > div > input').value = orderVal;
                        elmtSku.querySelector('td:nth-child(6) > div > button').click();

                        alert(element.split("	") [1] + 
                                '\nнужно - ' + parseInt(value) + ' есть - ' + maxOrd + 
                                '\nнехватает - ' + deficiency
                        )
                    }
                    else{
                        elmtSku.querySelector('td:nth-child(5) > div > input').value = parseInt(value);
                        elmtSku.querySelector('td:nth-child(6) > div > button').click();
                    }
                }
            });
        }

        if (find == false && parseInt(value) > 0)
        {
            alert('Сейчас нет \n' + element.split("	") [1] + '\nНужно \n' + value);
        }
    });

    if (maybeError){
        var myAudio = new Audio();
        myAudio.src = chrome.extension.getURL("sound/credulous.mp3");
        myAudio.play();
        alert('Ничего не нащли, скорее произошла ошибка!');
    }
    else{
        element.classList.add("hidden");
        
        var myAudio = new Audio();
        myAudio.src = chrome.extension.getURL("sound/definite.mp3");
        myAudio.play();
    }

}