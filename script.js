// Массив для хранения истории сообщений
let history = [];

// Функция шифрования/дешифрования (с поддержкой кириллицы)
function caesarCipher(text, shift, decrypt = false) {
    let result = '';
    const shiftValue = decrypt ? 33 - shift : shift;


    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);

        // Латинские заглавные (A-Z)
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + shiftValue) % 26) + 65);
        }
        // Латинские строчные (a-z)
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + shiftValue) % 26) + 97);
        }
        // Кириллица заглавная (А-Я, Ё)
        else if (charCode === 1025) { // Ё
            result += String.fromCharCode(((1025 - 1040 + shiftValue) % 33) + 1040);
        }
        else if (charCode >= 1040 && charCode <= 1071) { // А-Я
            result += String.fromCharCode(((charCode - 1040 + shiftValue) % 33) + 1040);
        }
        // Кириллица строчная (а-я, ё)
        else if (charCode === 1105) { // ё
            result += String.fromCharCode(((1105 - 1072 + shiftValue) % 33) + 1072);
        }
        else if (charCode >= 1072 && charCode <= 1103) { // а-я
            result += String.fromCharCode(((charCode - 1072 + shiftValue) % 33) + 1072);
        }
        // Всё остальное (цифры, знаки, пробелы) — без изменений
        else {
            result += text.charAt(i);
        }
    }
    return result;
}

// Сохранение в историю
function saveToHistory(original, result, shift) {
    history.push({
        original: original,
        result: result,
        shift: shift,
        timestamp: new Date().toLocaleString()
    });
    updateHistoryList();
}

// Обновление списка истории
function updateHistoryList() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';

    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `Сообщение ${index + 1} (${item.timestamp})`;
        li.addEventListener('click', () => showDetailCard(item));
        list.appendChild(li);
    });
}

// Показ карточки с деталями
function showDetailCard(item) {
    document.getElementById('detail-original').textContent = item.original;
    document.getElementById('detail-result').textContent = item.result;
    document.getElementById('detail-shift').textContent = item.shift;

    document.getElementById('detail-card').classList.remove('card-hidden');
}

// Закрытие карточки
function closeDetailCard() {
    document.getElementById('detail-card').classList.add('card-hidden');
}

// Валидация сдвига и показ ошибки
function validateShift() {
    const input = document.getElementById('shift');
    const error = document.getElementById('shift-error');
    const value = parseInt(input.value, 10);

    if (isNaN(value) || value < 1 || value > 25) {
        error.textContent = 'Значение должно быть от 1 до 25.';
        error.style.display = 'block';
        input.style.borderColor = '#ff3333';
        return false;
    } else {
        error.style.display = 'none';
        input.style.borderColor = '#ddd';
        return true;
    }
}

// Шифрование
function encryptText() {
    if (!validateShift()) return;

    const text = document.getElementById('text').value;
    const shift = parseInt(document.getElementById('shift').value);
    const encrypted = caesarCipher(text, shift);

    document.getElementById('result').value = encrypted;
    saveToHistory(text, encrypted, shift);
}

// Дешифрование
function decryptText() {
    if (!validateShift()) return;

    const text = document.getElementById('text').value;
    const shift = parseInt(document.getElementById('shift').value);
    const decrypted = caesarCipher(text, shift, true);

    document.getElementById('result').value = decrypted;
    saveToHistory(text, decrypted, shift);
}

// Инициализация (проверка при загрузке)
window.onload = function () {
    validateShift();
};
