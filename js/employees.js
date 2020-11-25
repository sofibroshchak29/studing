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
/**
 * Function for getting all employees from db.json
 */
getUsersList();
async function getUsersList() {
    var url = 'http://localhost:3000/employees';
    let response = await fetch(url);

    var list_html = '';
    if (response.ok) {
        var employees_object = await response.json();
        // get element where will be placed employees list in html
        var employee_list_element = document.getElementById("employee-list");
        Object.entries(employees_object).forEach(function(element) {
            if (element.length > 1) {
                Object.entries(element).forEach(function(user) {
                    if (user[1].id !=undefined) {
                        // creating employees list
                        let user_id = user[1].id;
                        let user_name = user[1].name;
                        list_html += '<li id="' + user_id + '" onclick="getUser(' + user_id  + ')" class="employee_list" >' + user_name + '</li>';
                    }
                });
            }
        })
        employee_list_element.innerHTML = list_html;
    } else {
        alert("Error HTTP: " + response.status);
    }
}

/**
 * Function for getting one employee info from db.json
 * @param id
 * @returns {Promise<void>}
 */
async function getUser(id) {
    var url = 'http://localhost:3000/employees/' + id + '/';
    let response = await fetch(url);

    var info_html = '';
    if (response.ok) {
        var employee_object = await response.json();
        // get element where will be placed employee info in html
        var employee_info_element = document.getElementById("employee-info");
        if (employee_object.id != undefined) {
            let user_id = employee_object.id;
            let user_name = employee_object.name;
            let user_text = employee_object.text;
            // creating employee info
            info_html += '<div> id: ' + user_id + '<br> name: ' + user_name + '<br> text: ' + user_text + '</div>';
        }
        employee_info_element.innerHTML = info_html;
    } else {
        alert("Error HTTP: " + response.status);
    }

    var list_elements = document.getElementsByClassName('employee_list');
    for(var i = 0; i < list_elements.length; i++){
        list_elements[i].style.color = "black";
    }
    document.getElementById(id).style.color = 'red';

}

/**
 * Function for saving employee in db.json
 * @param e
 * @returns {Promise<void>}
 */
async function createUser(e) {
    // no run submit when press form submit button
    e.preventDefault();

    //get entered data from form
    let name = document.getElementById('form_name').value;
    let text = document.getElementById('form_text').value;

    var url = 'http://localhost:3000/employees/';
    let new_user = {
        name: name,
        text: text,
        image: "image url"
    };

    // make request taht will be save employee data in db.jsom
    let response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(new_user)
    });

    if (response.ok) {
        // show message that user was saved to db.json
        alert('User created!');
        // close modal window with form
        modal.style.display = "none";
        // refresh list of employees
        getUsersList();
    } else {
        alert("Error HTTP: " + response.status);
    }


}

