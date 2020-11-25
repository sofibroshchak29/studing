// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



const refery_click_button = document.getElementById('restart-btn');
const player_1_click_button = document.getElementById('character-btn-kick');
const player_2_click_button = document.getElementById('enemy-btn-kick');

const refery = {
    element: document.getElementById('refery'),
    name: 'Refery',
    winner_name: document.getElementById('winner_name'),
}

const player_1 = {
    name: 'Pikachu',
    max_health: 100,
    current_health: 100,
    health: document.getElementById('health-character'),
    progress_bar: document.getElementById('progressbar-character')
}

const player_2 = {
    name: 'Charmander',
    max_health: 100,
    current_health: 100,
    health: document.getElementById('health-enemy'),
    progress_bar: document.getElementById('progressbar-enemy')
}

refery_click_button.addEventListener('click', () => {
    location.reload();
})

player_1_click_button.addEventListener('click', () => {
    changeHp(random(15), player_1)
})

player_2_click_button.addEventListener('click', () => {
    changeHp(random(15), player_2)
})

const init = () => {
    refery.element.style.display = 'none';
    renderHp(player_1)
    renderHp(player_2)
    random(15)
}

const renderHp = person => {
    renderHpLife(person)
    renderProgressbarHp(person)
}

const renderHpLife = person => {
    person.health.innerText = person.current_health + ' / ' + person.max_health
}

const renderProgressbarHp = person => {
    person.progress_bar.style.width = person.current_health + '%'
}

const changeHp = (count, person) => {
    if (person.current_health < count) {
        person.current_health = 0
        refery.element.style.display = 'block';
        let winner = 'No winner';
        if (person.name == 'Pikachu' ) winner = 'Charmander';
        else winner = 'Pikachu';
        refery.winner_name.innerHTML = 'WINNER <br>' + winner;
        player_1_click_button.setAttribute("disabled", true);
        player_2_click_button.setAttribute("disabled", true);
    } else {
        person.current_health -= count
    }
    renderHp(person)
}

const random = num => {
    return Math.ceil(Math.random() * num)
}

init()