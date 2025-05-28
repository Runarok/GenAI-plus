function vigenereCipher() {
    const text = document.getElementById('textInput').value.toUpperCase().replace(/[^A-Z]/g, ''); // Clean input text
    const key = document.getElementById('key').value.toUpperCase().replace(/[^A-Z]/g, ''); // Clean key
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (text === '' || key === '') {
        alert('Please enter both a key and text.');
        return;
    }

    let expandedKey = '';
    for (let i = 0, j = 0; i < text.length; i++) {
        expandedKey += key[j];
        j = (j + 1) % key.length;
    }

    let cipherText = '';
    const plainTextValues = [];
    const keyTextValues = [];
    const cipherTextValues = [];

    for (let i = 0; i < text.length; i++) {
        const ptChar = text[i];
        const keyChar = expandedKey[i];
        const ptIndex = alphabet.indexOf(ptChar);
        const keyIndex = alphabet.indexOf(keyChar);
        const cipherIndex = (ptIndex + keyIndex) % 26;
        const cipherChar = alphabet[cipherIndex];

        cipherText += cipherChar;
        plainTextValues.push(ptIndex);
        keyTextValues.push(keyIndex);
        cipherTextValues.push(cipherIndex);
    }

    let resultHTML = '';
    for (let i = 0; i < text.length; i++) {
        resultHTML += `<tr>
            <td>${text[i]}</td>
            <td>${plainTextValues[i]}</td>
            <td>${expandedKey[i]}</td>
            <td>${keyTextValues[i]}</td>
            <td>${cipherTextValues[i]}</td>
            <td>${cipherText[i]}</td>
        </tr>`;
    }

    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = resultHTML;
    document.getElementById('tableContainer').style.display = 'block';
}

document.getElementById('cipherBtn').addEventListener('click', vigenereCipher);
