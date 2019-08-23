// added button for popup
let li = document.createElement("li");
li.innerHTML = '<a id="makeOrder"><i class="fa fa-plus-square-o"></i><span> Order from file</span></a>';
document.querySelector("#top-links .list-inline").prepend(li);

//add popup
let divForm = document.createElement("div");
divForm.innerHTML = '<div id="divForm" class="hidden" style="width: 100%;height: 100%;background-color: rgba(0,0,0,0.8);overflow:hidden;position:fixed;top:0px;z-index: 999;text-align: center;padding: 25px 50px;"><div><span style="font-size: 48px;height: 100%;">Заказ:</span> <form><textarea id="orderText" type="text" name="order" style="width: 65%;padding: 10px;margin: 14px 0px;background-color: white !important;color: black !important;" rows="20"></textarea><br></form><div style="margin-bottom: 14px;"><a id="inpSku" style="background-color: #9e9e9e;border: none;padding: 15px 0px 15px 30px;text-align: center;text-decoration: none;font-size: 16px;text-transform: uppercase;font-weight: 900;height: 50px;margin-top: 20px;color: black;display: inline-block;/* width: 150px; */margin: 0px 15px;">Артикул<input placeholder="3" type="number" style="width: 55px;border: #9e9e9e;padding: 0px 0px 0px 15px;background-color: #9e9e9e;" min="0" id="inpSkuCol" value="1" max="99"></a><a id="inpVal" style="background-color: #9e9e9e;border: none;padding: 15px 0px 15px 30px;text-align: center;text-decoration: none;font-size: 16px;text-transform: uppercase;font-weight: 900;height: 50px;margin-top: 20px;color: black;display: inline-block;margin: 0px 15px;">Колонка с заказом<input placeholder="3" type="number" style="width: 55px;border: #9e9e9e;padding: 0px 0px 0px 15px;background-color: #9e9e9e;font-size: 16px;" min="0" id="inpSkuCol" value="3" max="99"></a><a id="inpRed" style="background-color: #9e9e9e;border: none;padding: 15px 0px 15px 30px;text-align: center;text-decoration: none;font-size: 16px;text-transform: uppercase;font-weight: 900;height: 50px;margin-top: 20px;color: black;display: inline-block;margin: 0px 15px;">redirect<input type="checkbox" id="scales" name="scales" style="width: 55px;border: #9e9e9e;padding: 0px 0px 0px 15px;background-color: #9e9e9e;font-size: 16px;"></a></div><a id="btnClose" style="background-color: #9e9e9e;border: none;padding: 15px 32px;text-align: center;text-decoration: none;font-size: 16px;text-transform: uppercase;font-weight: 900;height: 50px;margin-top: 20px;color: black;display: inline-block;width: 150px;margin: 0px 15px;">close</a><a id="btnForm" style="background-color: #ffd600;border: none;padding: 15px 32px;text-align: center;text-decoration: none;font-size: 16px;text-transform: uppercase;font-weight: 900;height: 50px;margin-top: 20px;color: black;display: inline-block;width: 250px;margin: 0px 15px;">make order</a><a id="btnClear" style="background-color: #ff5722;border: none;padding: 15px 32px;text-align: center;text-decoration: none;font-size: 16px;text-transform: uppercase;font-weight: 900;height: 50px;margin-top: 20px;color: black;display: inline-block;width: 150px;margin: 0px 15px;">clear</a>   </div></div>';
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