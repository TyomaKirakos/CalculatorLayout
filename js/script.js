// ---------------------------Константы------------------------------------
const add_screen_btn = document.querySelector('.add-screen-btn');
const screens_block = document.querySelector('.main-controls__views');
const start_btn = document.getElementById('start');
const reset_btn = document.getElementById('reset');
const percent_checks = document.querySelectorAll('.other-items.percent')
const number_checks = document.querySelectorAll('.other-items.number')
const rollback_block = document.querySelector('.main-controls__range');
const rollback_range = rollback_block.querySelector('input[type=range]');
const rollback_value = rollback_block.querySelector('.range-value');
const total_inputs = document.querySelectorAll('.total-input');
// const cms_checkbox = document.getElementById('cms-open');
// const cms_block = document.querySelector('.main-controls__item');
let isValid_form = true;
let del_screen_btn;
let screen_areas = document.querySelectorAll('.screen');
let layout_price = 0;
let add_serv_price = 0;
let final_price = 0;
let total_layout_price = document.getElementById('total');
let total_number = document.getElementById('total-count');
let total_add_price = document.getElementById('total-count-other');
let total_price = document.getElementById('total-full-count');
let total_price_roll = document.getElementById('total-count-rollback');
let new_screen_area;
let final_screen_number = 0;
let final_screens_sum = 0;
let all_input_fields;
let all_inputs;
let all_selects;
let all_checkboxes;

// let valid_form = true;

// Обед таксиста чееееек
// console.log(screen_areas);
// console.log(percent_checks);
// console.log(number_checks);
// console.log(rollback_range);

// ---------------------Навешивание функций------------------------------
add_screen_btn.addEventListener('click', addingScreens)
start_btn.addEventListener('click',calculation);
reset_btn.addEventListener('click', reseting)
rollback_range.addEventListener('input', rangeChanging);
// cms_checkbox.addEventListener('click', cmsCheckbox)

// ---------------------------Функции------------------------------------
// CMS
// function cmsCheckbox(){
//     if (cms_checkbox.checked){
        
//     }
// }

// Добавление экранов
function addingScreens(){
    screen_areas = document.querySelectorAll('.screen');
    new_screen_area = screen_areas[0].cloneNode(true);
    new_screen_area.querySelector('input').value = '';
    screen_areas[screen_areas.length-1].after(new_screen_area);
    if (document.querySelector('.del-screen-btn') == null){
        del_screen_btn = document.createElement('button');
        del_screen_btn.textContent = '-';
        del_screen_btn.classList.add("screen-btn");
        del_screen_btn.classList.add("del-screen-btn");
        screens_block.append(del_screen_btn);
        del_screen_btn.addEventListener('click', deletingScreens);
    };
}

// удаление экранов
function deletingScreens(){
    screen_areas = document.querySelectorAll('.screen');
    if (screen_areas.length > 1){
        screen_areas[screen_areas.length-1].remove();
        screen_areas = document.querySelectorAll('.screen');
        if (screen_areas.length == 1){
            del_screen_btn.remove();
        }
    }
}

// Изменение Range
function rangeChanging(){
    rollback_value.textContent = rollback_range.value + '%';
    total_price_roll.value = final_price * ( 1 - (rollback_range.value / 100));
}

// расчёт вёрстки
function screenSumCounting(){
    final_screen_number = 0;
    final_screens_sum = 0;
    screen_areas = document.querySelectorAll('.screen');
    screen_areas.forEach((screen_area)=>{
        let screen_type = screen_area.querySelector('select').value;
        let screen_number = Number(screen_area.querySelector('input[type=text]').value.trim());
        if (screen_type == '' || screen_number <= 0 || isNaN(screen_number)){
            alert('Введите корректные значения!');
            isValid_form = false;
        }
        console.log(screen_number);
        final_screen_number += screen_number;
        final_screens_sum += screen_type * screen_number;
    });
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

// расчёт
function calculation(){
    screenSumCounting();
    if (isValid_form){
        layout_price = final_screens_sum;

        let checkbox_percent = checkboxPercentCounting();
        console.log(checkbox_percent);
    
        let checkbox_number = checkboxNumberCounting();
        console.log(checkbox_number);
    
    
        add_serv_price = layout_price * checkbox_percent + checkbox_number;
        final_price = layout_price + add_serv_price;
    
        total_layout_price.value = layout_price;
        total_number.value = final_screen_number;
        total_add_price.value = add_serv_price;
        total_price.value = final_price;
        total_price_roll.value = final_price * ( 1 - (rollback_range.value / 100));
    
        all_inputs = screens_block.querySelectorAll('input[type=text]');
        all_selects = document.querySelectorAll('select');
        all_checkboxes = document.querySelectorAll('input[type=checkbox]');
    
        all_input_fields = [all_inputs, all_selects, all_checkboxes];
    
        all_input_fields.forEach((group) => {
            group.forEach((element) => {
                element.setAttribute('disabled', 'disabled');
            });
        });
        
        start_btn.style.display = 'none';
        reset_btn.style.display = 'block';
    }
};

// сброс
function reseting(){
    all_input_fields.forEach((group) => {
        group.forEach((element) => {
            element.removeAttribute('disabled', 'disabled');
            element.value = '';
            element.checked = false;
        });
    });

    total_inputs.forEach((total_input) => {
        total_input.value = 0;
    });

    if (screen_areas.length > 1){
        for (let i = 0; i < (screen_areas.length-1); i++){
            screen_areas[i].remove();
        }
    }

    start_btn.style.display = 'block';
    reset_btn.style.display = 'none';


    rangeChanging();
}