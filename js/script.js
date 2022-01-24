// ---------------------------Константы------------------------------------
const add_screen_btn = document.querySelector('.screen-btn');
const screens_block = document.querySelector('.main-controls__views');
const start_btn = document.getElementById('start');
let screen_areas = document.querySelectorAll('.screen');
const percent_checks = document.querySelectorAll('.other-items.percent')
const number_checks = document.querySelectorAll('.other-items.number')
const rollback_block = document.querySelector('.main-controls__range');
const rollback_range = rollback_block.querySelector('input[type=range]');
const rollback_value = rollback_block.querySelector('.range-value');
// let valid_form = true;

// Обед таксиста чееееек
console.log(screen_areas);
console.log(percent_checks);
console.log(number_checks);
console.log(rollback_range);

// ---------------------Навешивание функций------------------------------
add_screen_btn.addEventListener('click', addingScreens)
start_btn.addEventListener('click',calculation);
rollback_range.addEventListener('input', rangeChanging)

// ---------------------------Функции------------------------------------
// Добавление экранов
function addingScreens(){
    let new_screen_area = screen_areas[screen_areas.length-1].cloneNode(true);
    new_screen_area.querySelector('input[type=text]').value = '';
    screen_areas[screen_areas.length-1].after(new_screen_area);
}

// Изменение Range
function rangeChanging(){
    rollback_value.textContent = rollback_range.value + '%';
}

// Валидация
// function validation(){


//     if (isNaN(screen_number)){
//         console.log('Введите корректное значение');
//     };
// }

function screenSumCounting(){
    screen_areas = document.querySelectorAll('.screen');
    let final_screen_number = 0;
    let final_screens_sum = 0;
    screen_areas.forEach((screen_area)=>{
        let screen_type_index = screen_area.querySelector('select').options.selectedIndex;
        let screen_type = screen_area.querySelector('select').options[screen_type_index].value;
        let screen_number = Number(screen_area.querySelector('input[type=text]').value.trim());
        // if (screen_type == '' || screen_number <= 0 || isNaN(screen_number)){
        //     valid_form = false;
        // }
        console.log(screen_number);
        final_screen_number += screen_number;
        final_screens_sum += screen_type * screen_number;
    });
    return [final_screen_number, final_screens_sum];
}

// Функция расчёта чекбоксов с процентами
function checkboxPercentCounting(){
    let final_percent_checks = 0;
    // Расчёт итогового процента
    percent_checks.forEach((percent_check) => {
        if (percent_check.querySelector('input[type=checkbox]').checked){
            final_percent_checks += Number(percent_check.querySelector('input[type=text]').value);
        }
    });
    final_percent_checks = final_percent_checks / 100;
    return final_percent_checks;
}

// Функция расчёта чекбоксов с числами
function checkboxNumberCounting(){
    let final_number_checks = 0;
    // Расчёт итоговой стоимости доп. услуг
    number_checks.forEach((number_check) => {
        if (number_check.querySelector('input[type=checkbox]').checked){
            final_number_checks += Number(number_check.querySelector('input[type=text]').value);
        }
    });
    return final_number_checks;
}

function calculation(){
    let final_screen_number  = screenSumCounting()[0];
    let final_screens_sum = screenSumCounting()[1];
    // if(valid_form == false){
    //     alert('Заполните поля корректно');
    // }
    console.log(final_screen_number);
    console.log(final_screens_sum);

    let checkbox_percent = checkboxPercentCounting();
    console.log(checkbox_percent);

    let checkbox_number = checkboxNumberCounting();
    console.log(checkbox_number);

    let rollback_percent = rollback_range.value;
    console.log(rollback_percent);
};