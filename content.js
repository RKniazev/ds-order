let li = document.createElement("li");
let i = document.createElement("i");
let a = document.createElement("a");
let span = document.createElement("span");
let text = " Order from file";
let icon = "fa fa-plus-square-o";

span.innerText = text;
i.className = icon;

a.prepend(span);
a.prepend(i);
a.id = "makeOrder";
li.prepend(a);

document.querySelector("#top-links .list-inline").prepend(li);

li.onclick = function() {
    console.log("click");
}