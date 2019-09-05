// added button for popup
let li = document.createElement("li");
li.innerHTML = '<a id="makeOrder"><i class="fa fa-plus-square-o"></i><span> Order from file</span></a>';
document.querySelector("#top-links .list-inline").prepend(li);

//add popup
let divForm = document.createElement("div");
divForm.id = 'divForm';
divForm.className = 'hidden';
divForm.innerHTML = '<h1>Заказ:</h1> <form><textarea id="orderText" type="text" name="order" class="form-control input-lg" rows="20"></textarea><br></form><div class="set-div"><button type="button" class="btn" id="inpSku">колонка для артикула<input placeholder="3" type="number" min="0" id="inpSkuCol" value="1" max="99"></button><button type="button" class="btn" id="inpVal">Колонка для заказа<input placeholder="3" type="number" min="0" id="inpSkuCol" value="1" max="99"></button><button type="button" class="btn" id="redirect">redirect<span class="badge badge-light">X</span></button></div><div class="btn-div" style=""><a id="btnClose" class="btn btn-lg">close</a><a id="btnForm" class="btn btn-lg">make order</a><a id="btnClear" class="btn btn-lg">clear</a></div>';
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

//redirect
function checkRedirect()
{
    return document.querySelector("#redirect span").innerText === 'V' ? true : false;  
}

if(localStorage.getItem('redirect') == null){
    localStorage.setItem('redirect', checkRedirect());
}
else{
    document.querySelector("#redirect span").innerText = localStorage.getItem('redirect') == 'true' ? 'V' : 'X';
}

document.getElementById('redirect').onclick = function(){
    if(document.querySelector("#redirect span").innerText == 'X'){
        document.querySelector("#redirect span").innerText = 'V';
        localStorage.setItem('redirect', checkRedirect());
    }
    else{
        document.querySelector("#redirect span").innerText = 'X';
        localStorage.setItem('redirect', checkRedirect());
    }
}

if(window.location.href.indexOf("limit=100") == '-1' && localStorage.getItem('redirect') == 'true'){
    document.location.href = window.location.href + '?limit=100';
}

//main script for make order
function sku(inpSku,name,value) {
    this.sku = inpSku;
    this.name = name;
    this.value = value;
}

let orderdsm100 = [];
let orderdsm250 = [];
let orderdss100 = [];
let orderdss250 = [];
let orderdsr100 = [];
let orderdsr250 = [];
let orderdh40 = [];
let orderdh200 = [];
let orderdmini = [];
let orderdgastro = [];

function addtocategory (sku){
    if (sku.indexOf("kDJA") != '-1'){
        alert('gastro');
    }
    if (sku.indexOf("DM") != '-1'){
        alert('dmini');
    }
    if (sku.indexOf("DH-") != '-1'){
        alert('dh40');
    }
    if (sku.indexOf("DHV-") != '-1'){
        alert('dh200');
    }
    if (sku.indexOf("DS1") != '-1'){
        alert('dsm100');
    }
    if (sku.indexOf("DS0") != '-1'){
        alert('dsm250');
    }
    if (sku.indexOf("DSR1") != '-1'){
        alert('dsr100');
    }
    if (sku.indexOf("DSR0") != '-1'){
        alert('dsr250');
    }
    if (sku.indexOf("DSS1") != '-1'){
        alert('dss100');
    }
    if (sku.indexOf("DSS0") != '-1'){
        alert('dss250');
    }
}

btnForm.onclick = function() {
    alert('work');
    let maybeError = true;
    let element = document.getElementById("divForm");
    let textArea = document.getElementById("orderText").value.split("\n");
    let pageSku = document.querySelectorAll('#products-table tr');
    colSku = localStorage.getItem('#inpSku input');
    colVal = localStorage.getItem('#inpVal input');

    console.log(textArea);

    textArea.forEach(element => {
        let find = false;
        let inpSku = element.split("	")[colSku-1];
        let value = element.split("	")[colVal-1];
        let name = element.split("	")[2-1];
        
        makeOrderSku(inpSku,name,value);
        
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