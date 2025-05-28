function caesarCipher() {
  const text = document.getElementById("textInput").value;
  const shift = parseInt(document.getElementById("shift").value);

  if (!text) {
    alert("Please enter text.");
    return;
  }
  if (isNaN(shift) || shift < 1 || shift > 25) {
    alert("Please enter a valid shift value between 1 and 25.");
    return;
  }

  let resultHTML = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/i)) {
      const isUpper = char === char.toUpperCase();
      const offset = isUpper ? 65 : 97;

      // Convert char to 0-25 index
      const originalValue = char.charCodeAt(0) - offset;

      // Encrypt
      const encryptedValue = (originalValue + shift) % 26;
      const encryptedChar = String.fromCharCode(encryptedValue + offset);

      // Decrypt
      const decryptedValue = (originalValue - shift + 26) % 26;
      const decryptedChar = String.fromCharCode(decryptedValue + offset);

      resultHTML += `<tr>
        <td>${i}</td>
        <td>${char}</td>
        <td>${originalValue}</td>
        <td>${encryptedValue}</td>
        <td>${encryptedChar}</td>
        <td>${decryptedValue}</td>
        <td>${decryptedChar}</td>
      </tr>`;
    } else {
      // Non-alphabetic chars, no numeric conversion
      resultHTML += `<tr>
        <td>${i}</td>
        <td>${char}</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>${char}</td>
        <td>N/A</td>
        <td>${char}</td>
      </tr>`;
    }
  }

  document.getElementById("resultTable").innerHTML = resultHTML;
  document.getElementById("tableContainer").style.display = "block";
}

document.getElementById("cipherBtn").addEventListener("click", caesarCipher);
