document.addEventListener("DOMContentLoaded", monsters)


function monsters() {
    monsterList()
    document.querySelector('#submit').addEventListener('submit', submitHandler);
}


function monsterList() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=10')
        .then(response => response.json())
        .then(data => {
            data.forEach(monster => listMonsters(monster))
        })
}



function listMonsters(monster) {
        let container = document.getElementById('monster-container')
        let li = document.createElement('p')
        li.innerHTML = `Name: ${monster.name}<br><br>Age: ${monster.age}<br><br>Description: ${monster.description}<br>____________________________________`
        container.appendChild(li)
    }

function submitHandler(event) {
    event.preventDefault();
    createNewMonsters();
    getForm.reset();
}

function createNewMonsters() {
    let data = {'name': document.getElementById('name-input').value,
    'age': document.getElementById('age-input').value,
    'description': document.getElementById('description-input').value}
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