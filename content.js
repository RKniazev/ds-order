let li = document.createElement("li");
li.innerHTML = '<a id="makeOrder"><i class="fa fa-plus-square-o"></i><span> Order from file</span></a>';

document.querySelector("#top-links .list-inline").prepend(li);

let divForm = document.createElement("div");

divForm.innerHTML = '<div id="divForm" class="hidden" style="width: 100%;height: 100%;background-color: rgba(0,0,0,0.8);overflow:hidden;position:fixed;top:0px;z-index: 999;text-align: center;padding: 25px 50px;"><div><span style="font-size: 48px;height: 100%;">Заказ:</span> <form><textarea id="orderText" type="text" name="order" style="width: 65%;margin-top: 20px;padding: 10px;margin-bottom: 0px;background-color: white !important;color: black !important;" rows="20"></textarea><br></form><a id="btnForm" style="background-color: #ffd600;border: none;padding: 15px 32px;text-align: center;text-decoration: none;font-size: 16px;text-transform: uppercase;font-weight: 900;height: 50px;margin-top: 20px;color: black;display: inline-block;width: 150px;">GO</a></div></div>';

document.querySelector('body').append(divForm);

let arrayOfLines = ["1","2"];

li.onclick = function() {
    let element = document.getElementById("divForm");
    element.classList.remove("hidden");
}

btnForm.onclick = function() {
    let element = document.getElementById("divForm");
    element.classList.add("hidden");
    let textArea = document.getElementById("orderText").value.split("\n");
    let pageSku = document.querySelectorAll('#products-table tr');
    console.log(textArea);
    console.log(pageSku);

    textArea.forEach(element => {
        let find = false;

        if (element.length >= 2)
        {
            let inpSku = element.split("	")[0];
            let value = element.split("	")[2];
            
            pageSku.forEach(elmtSku => {
                let sku = elmtSku.querySelector('td:nth-child(2)').innerText;
                
                if (parseInt(value) > 0 && find == false && inpSku == sku) {
                    find = true;
                    console.log('Нашли' + sku + ' / заполняем ' + value);
                    elmtSku.querySelector('td:nth-child(5) > div > input').value = parseInt(value);

                    console.log(elmtSku.querySelector('td:nth-child(6) > div > button'));
                    elmtSku.querySelector('td:nth-child(6) > div > button').click();
                }
            });
        }

        if (find == false && element.length >= 2)
        {
            alert('Сейчас нет \n' + element.split("	") [1]);
        }
    });
}
