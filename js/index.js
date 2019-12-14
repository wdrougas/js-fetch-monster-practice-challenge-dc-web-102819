document.addEventListener("DOMContentLoaded", monsters)


function monsters() {
    monsterList()
    getForm().addEventListener('submit', submitHandler);
}


function monsterList() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=10')
        .then(response => response.json())
        .then(data => {
            data.forEach(monster => listMonsters(monster))
        })
}

function getForm() {
    return document.querySelector('form')
}

function listMonsters(monster) {
        let container = document.getElementById('monster-container')
        let li = document.createElement('p')
        li.innerHTML = `Name: ${monster.name}<br><br>Age: ${monster.age}<br><br>Description: ${monster.description}<br>____________________________________`
        container.appendChild(li)
    }

function submitHandler(event) {
    event.preventDefault();
    createNewMonsters(event);
    getForm.reset();
}


function createMonsterListener() {
    getForm()
}

function createNewMonsters(event) {
    let data = {
        'name' : document.querySelector('#name-input').value,
        'age' : document.querySelector('#age-input').value,
        'description' : document.querySelector('#description-input').value
    }
    debugger
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => listMonsters(data));
}

