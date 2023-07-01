// function saveLead(){
//     console.log("button clicked");
// }

//  or  (both are same)

// const variable can't reassign

let myLeads = [];

const inputEl = document.getElementById("input-el");
let inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById("del-btn");
let tabBtn = document.getElementById("tab-btn");
let defaultBtn = document.getElementById("default-btn");
let themeColor = document.getElementById("theme-color");


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}



tabBtn.addEventListener("click", function (){

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target = '_blank' href="${leads[i]}">${leads[i]}</a>
        </li>
        `

    }
    ulEl.innerHTML = listItems;
}



deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})



inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);

    // console.log(localStorage.getItem("myLeads"))
})



// for color changer
// {
    
let root = document.querySelector(':root');

themeColor.addEventListener('input', function() {
    localStorage.setItem("--tempcolor", JSON.stringify(this.value));
    root.style.setProperty('--tempcolor', this.value);
})

const colorfromlstorage = JSON.parse(localStorage.getItem("--tempcolor"));

root.style.setProperty('--tempcolor', colorfromlstorage);

defaultBtn.addEventListener("click",function(){
    root.style.setProperty('--tempcolor','#0c6818')
})

// or

// function defaultcolor(){
//     root.style.setProperty('--tempcolor', '#0c6818');
// }

    // }