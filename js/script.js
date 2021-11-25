let boxes = [774, 214, 694, 321, 674, 527, 120, 567];       // Коробки 
let shelfLength = 1310;                                     // Длина одной полки на стеллаже
let rack = [];                                              // Стеллаж (массив полок)

boxes.sort( (a, b) => b - a );                              // Сортировка всех коробок по невозрастанию

window.onload = solveTask();

// Решение задачи
function solveTask() {                                     
    let numShelf = 0;                                       // Индекс полки на стеллаже
    while (boxes.length != 0) {
        let shelf = [];                                     // Новая полка                          
        rack.push(shelf);
        rack[numShelf].push(boxes[0]);
        let summShelf = boxes[0];                           // Суммарная длина коробок на полке
        boxes.splice(0,1);

        for (let j = 0; j < boxes.length; j++) {            // Расстановка коробок по полке
            if (summShelf + boxes[j] <= shelfLength) {
                rack[numShelf].push(boxes[j]);
                summShelf += boxes[j];
                boxes.splice(j,1);
                j--;
            }
        }
        numShelf++;
    }
    let summ = rack[0].reduce((sum, current) => sum + current, 0);      // Вычисление общей длины коробок на полке
    visual();
}

// Визуализация решения
function visual() {
    let rackBody = document.querySelector(".rack-body");                        // Блок "Стеллаж"
    for (let numShelf = 0; numShelf < rack.length; numShelf++) {                // Заполнение стеллажа полками
        let divShelf = document.createElement('div');                           
        divShelf.className = "rack-shelf";
        rackBody.append(divShelf);

        for (let numBox = 0; numBox < rack[numShelf].length; numBox++) {        // Заполнение полки коробками
            let divBox = document.createElement('div');
            divBox.className = "rack-shelf-box";
            divBox.style.width = rack[numShelf][numBox] / (shelfLength / 100) + "%";   // Вычисление размера коробки
            divBox.innerHTML = rack[numShelf][numBox];
            divShelf.append(divBox);
        }
    }
}