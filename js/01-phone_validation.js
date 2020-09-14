var start_string = '0934878790';
var country_code_string = '';
var operator_code_string = '';
var number_string = '';
var phone = '';

// remove all spaces in start string (g - mains that spaces can be repeat in string)
start_string = start_string.replace(/\s+/g, '');

// get main parts of number depends of start string structure
if (start_string.substr(0,1) == '+' && start_string.length == 13) {
    country_code_string = start_string.substr(1, 2);
    operator_code_string = start_string.substr(3, 3);
    number_string = start_string.substr(6);
} else if (start_string.substr(0,1) != '+' && start_string.length == 12) {
    country_code_string = start_string.substr(0, 2);
    operator_code_string = start_string.substr(2, 3);
    number_string = start_string.substr(5);
} else if (start_string.substr(0,1) == '0' && start_string.length == 10) {
    country_code_string = 38;
    operator_code_string = start_string.substr(0, 3);
    number_string = start_string.substr(3);
} else {
    console.log('Error');
}

phone = makePhone();


function getCountryCode($string) {
    return '+' + $string;
}
function getOperatorCode($string) {
    return '(' + $string + ')' ;
}

function getNumber($string) {
    return $string.substr(0, 3) + '-' + $string.substr(3, 2) + '-' + $string.substr(5, 2);
}

function makePhone() {
    return getCountryCode(country_code_string) + ' ' + getOperatorCode(operator_code_string) + ' ' + getNumber(number_string);
}

console.log(phone);