
/**
 * Массив для хранения транзакций
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Идентификатор для следующей транзакции
 * @type {number}
 */
let id = 0;

/**
 * Обработчик события отправки формы
 */
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTransaction();
});

/**
 * Обработчик события клика по таблице
 */
document.getElementById('transactions-table').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName == "BUTTON") {
        deleteTransaction(e.target.id);
    }
});

/**
 * Добавляет новую транзакцию на основе данных из формы
 */
function addTransaction() {
    let amount = document.getElementById('amount').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let date = new Date().toLocaleString();
    let transaction = {
        id: id++,
        date: date,
        amount: amount,
        category: category,
        description: description
    };
    transactions.push(transaction);
    addRow(transaction);
    calculateTotal();
}

/**
 * Добавляет новую строку в таблицу на основе данных транзакции
 * @param {Object} transaction - объект транзакции
 */
function addRow(transaction) {
    let table = document.getElementById('transactions-table');
    let row = table.insertRow(-1);
    row.id = 'row-' + transaction.id;
    row.className = transaction.amount >= 0 ? 'positive' : 'negative';
    let cells = [
        row.insertCell(0),
        row.insertCell(1),
        row.insertCell(2),
        row.insertCell(3)
    ];
    cells[0].innerHTML = transaction.id;
    cells[1].innerHTML = transaction.date;
    cells[2].innerHTML = transaction.category;
    cells[3].innerHTML = transaction.description.split(' ').slice(0, 4).join(' ');
    row.insertCell(4).innerHTML = '<button id="' + transaction.id + '">Удалить</button>';
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            document.getElementById('full-description').innerText = 
                'ID: ' + transaction.id + '\n' +
                'Дата и время: ' + transaction.date + '\n' +
                'Категория: ' + transaction.category + '\n' +
                'Описание: ' + transaction.description + '\n' +
                'Сумма: ' + transaction.amount;
        });
    });
}

/**
 * Удаляет транзакцию по идентификатору
 * @param {number} id - идентификатор транзакции
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id != id);
    let row = document.getElementById('row-' + id);
    row.parentNode.removeChild(row);
    calculateTotal();
}

/**
 * Вычисляет и отображает общую сумму транзакций
 */
function calculateTotal() {
    let total = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    document.getElementById('total').innerText = 'Общая сумма: ' + total;
}
