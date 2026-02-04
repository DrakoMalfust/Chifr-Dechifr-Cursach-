function caesarCipher(text, shift, decrypt = false) {
    let result = '';
    const shiftValue = decrypt ? 33 - shift : shift; // для дешифровки обратный сдвиг

    if (shift > 33 ) {
        return alert("Введен некоректный тип данных ")
    }

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);


        // Заглавные латинские буквы (A-Z)
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + shiftValue) % 26) + 65);
        }
        // Строчные латинские буквы (a-z)
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + shiftValue) % 26) + 97);
        }
        // Заглавные кириллические буквы (А-Я + Ё)
        else if (charCode === 1025) { // Ё (заглавная)
            result += String.fromCharCode(((1025 - 1040 + shiftValue) % 33) + 1040);
        }
        else if (charCode >= 1040 && charCode <= 1071) { // А-Я (без Ё)
            result += String.fromCharCode(((charCode - 1040 + shiftValue) % 33) + 1040);
        }
        // Строчные кириллические буквы (а-я + ё)
        else if (charCode === 1105) { // ё (строчная)
            result += String.fromCharCode(((1105 - 1072 + shiftValue) % 33) + 1072);
        }
        else if (charCode >= 1072 && charCode <= 1103) { // а-я (без ё)
            result += String.fromCharCode(((charCode - 1072 + shiftValue) % 33) + 1072);
        }
        // Всё остальное (цифры, знаки, пробелы) — без изменений
        else {
            result += text.charAt(i);
        }
    }
    return result;
}

function encryptText() {
    const text = document.getElementById('text').value;
    const shift = parseInt(document.getElementById('shift').value);
    const encrypted = caesarCipher(text, shift);
    document.getElementById('result').value = encrypted;
}

function decryptText() {
    const text = document.getElementById('text').value;
    const shift = parseInt(document.getElementById('shift').value);
    const decrypted = caesarCipher(text, shift, true);
    document.getElementById('result').value = decrypted;
}
