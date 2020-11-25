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

getUsersList();
async function getUsersList() {
    var url = 'http://localhost:3000/employees';

    let response = await fetch(url);

    var list_html = '';
    if (response.ok) {
        var employees_object = await response.json();
        // alert(json);
        // alert(json[0].name);
        var employee_list_element = document.getElementById("employee-list");
        Object.entries(employees_object).forEach(function(element) {
            if (element.length > 1) {
                Object.entries(element).forEach(function(user) {
                    if (user[1].id !=undefined) {
                        let user_id = user[1].id;
                        let user_name = user[1].name;
                        list_html += '<li id="' + user_id + '">' + user_name + '</li>';
                    }
                });
            }
        })
        employee_list_element.innerHTML = list_html;
    } else {
        alert("Помилка HTTP: " + response.status);
    }
}

getUser(3);
async function getUser(id) {
    var url = 'http://localhost:3000/employees/' + id + '/';
    // var url = 'http://localhost:3000/employees/2/';

    let response = await fetch(url);

    var info_html = '';
    if (response.ok) {
        var employee_object = await response.json();
        var employee_info_element = document.getElementById("employee-info");
        if (employee_object.id != undefined) {
            let user_id = employee_object.id;
            let user_name = employee_object.name;
            let user_text = employee_object.text;
            info_html += '<div> id: ' + user_id + '<br> name: ' + user_name + '<br> text: ' + user_text + '</div>';
        }
        employee_info_element.innerHTML = info_html;
    } else {
        alert("Помилка HTTP: " + response.status);
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